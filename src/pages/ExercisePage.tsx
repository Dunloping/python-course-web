import { useState, useRef, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Editor from '@monaco-editor/react'
import { useProgress } from '../contexts/ProgressContext'
import { exercises } from '../data/exercises'

export default function ExercisePage() {
  const { exerciseId } = useParams<{ exerciseId: string }>()
  const { progress, completeExercise, isExerciseUnlocked } = useProgress()
  
  const exercise = exercises.find(e => e.id === exerciseId)
  const [code, setCode] = useState(exercise?.starterCode || '')
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [pyodide, setPyodide] = useState<any>(null)
  const [loadingPyodide, setLoadingPyodide] = useState(false)
  
  const editorRef = useRef<any>(null)

  useEffect(() => {
    if (exercise) {
      setCode(exercise.starterCode)
      setOutput('')
      setShowSolution(false)
      setShowHints(false)
    }
  }, [exercise?.id])

  // Load Pyodide
  const loadPyodide = async () => {
    if (pyodide) return pyodide
    
    setLoadingPyodide(true)
    try {
      // @ts-ignore
      const pyodideModule = await import('https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.mjs')
      const py = await pyodideModule.loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
      })
      setPyodide(py)
      setLoadingPyodide(false)
      return py
    } catch (error) {
      console.error('Error loading Pyodide:', error)
      setLoadingPyodide(false)
      setOutput('Error al cargar el intérprete de Python. Intentá de nuevo.')
      return null
    }
  }

  const runCode = async () => {
    if (!exercise) return
    
    setIsRunning(true)
    setOutput('Ejecutando...\n')
    
    const py = await loadPyodide()
    if (!py) {
      setIsRunning(false)
      return
    }

    const results: string[] = []
    let allPassed = true

    for (const test of exercise.tests) {
      try {
        // Set up fresh stdin/stdout and a deterministic seed per test
        py.runPython(`
import sys
import io
import random
sys.stdin = io.StringIO(${JSON.stringify(test.input)})
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
random.seed(0)
`)
        py.runPython(code)

        const stdout = py.runPython('sys.stdout.getvalue()')
        const normalized = stdout.trim()
        const passed = test.expected
          .split('\n')
          .map(line => line.trim())
          .every(line => normalized.includes(line))

        results.push(`${passed ? '✅' : '❌'} Entrada: ${test.input}\n${normalized || '(Sin salida)'}`)
        if (!passed) {
          results.push(`   Esperado: ${test.expected}`)
          allPassed = false
        }
      } catch (error: any) {
        results.push(`❌ Entrada: ${test.input}\nError: ${error.message}`)
        allPassed = false
      }
    }

    if (allPassed) {
      completeExercise(exercise.id, 100)
      setOutput(results.join('\n\n') + '\n\n✅ ¡Correcto! Todos los casos pasaron.')
    } else {
      setOutput(results.join('\n\n') + '\n\n⚠️ Algunos casos fallaron. Revisá tu código e intentá de nuevo.')
    }

    setIsRunning(false)
  }

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor
  }

  if (!exercise) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-slate-100">Ejercicio no encontrado</h2>
        <Link to="/" className="text-neon hover:underline mt-4 block">
          Volver al inicio
        </Link>
      </div>
    )
  }

  const isUnlocked = isExerciseUnlocked(exercise.id)

  if (!isUnlocked) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-2xl font-bold text-slate-100 mb-2">Ejercicio bloqueado</h2>
        <p className="text-slate-400 mb-6">
          Completá el tema {exercise.lessonId} para desbloquear este ejercicio.
        </p>
        <Link
          to={`/student/week/${exercise.week}`}
          className="neon-btn"
        >
          Volver a la Semana {exercise.week}
        </Link>
      </div>
    )
  }

  const result = progress.exerciseResults[exercise.id]

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-slate-500">
        <Link to="/student" className="hover:text-neon transition-colors">Inicio</Link>
        <span>/</span>
        <Link to={`/student/week/${exercise.week}`} className="hover:text-neon transition-colors">
          Semana {exercise.week}
        </Link>
        <span>/</span>
        <span className="text-slate-300">{exercise.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left panel: Exercise info */}
        <div className="space-y-6">
          {/* Header */}
          <div className="card p-6 relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-flame/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <span className="chip-flame mb-3">
                  Ejercicio · Semana {exercise.week}
                </span>
                <h1 className="text-2xl font-bold text-slate-100">{exercise.title}</h1>
              </div>
              {result?.completed && (
                <div className="w-10 h-10 bg-volt/10 border border-volt/40 rounded-full flex items-center justify-center shadow-[0_0_12px_-2px_rgba(52,211,153,0.6)]">
                  <span className="text-volt text-xl">✓</span>
                </div>
              )}
            </div>
            <p className="mt-4 text-slate-400">{exercise.description}</p>

            {result && (
              <div className="mt-4 p-3 bg-night-900 border border-night-600/40 rounded-lg">
                <div className="text-sm text-slate-400">
                  Intentos: <span className="font-medium text-slate-200">{result.attempts}</span>
                  {result.completed && (
                    <span className="ml-4 text-volt font-medium">✓ Completado</span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Expected output */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-slate-100 mb-3">
              Salida esperada <span className="text-neon font-mono">▸</span>
            </h2>
            <div className="bg-night-950 text-slate-100 rounded-xl p-4 font-mono text-sm border border-night-600/60">
              {exercise.tests.map((test, i) => (
                <div key={i} className="mb-2 last:mb-0">
                  <div className="text-slate-500 text-xs mb-1">$ entrada: {test.input}</div>
                  <div className="text-volt">{test.expected}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hints */}
          <div className="card p-6">
            <button
              onClick={() => setShowHints(!showHints)}
              className="flex items-center justify-between w-full text-left"
            >
              <h2 className="text-lg font-semibold text-slate-100">Pistas</h2>
              <svg
                className={`w-5 h-5 text-slate-500 transition-transform ${showHints ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showHints && (
              <ul className="mt-4 space-y-2">
                {exercise.hints.map((hint, i) => (
                  <li key={i} className="flex items-start space-x-2 text-slate-400">
                    <span className="text-neon mt-1">💡</span>
                    <span>{hint}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Solution */}
          <div className="card p-6">
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="flex items-center justify-between w-full text-left"
            >
              <h2 className="text-lg font-semibold text-slate-100">Solución</h2>
              <svg
                className={`w-5 h-5 text-slate-500 transition-transform ${showSolution ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showSolution && (
              <pre className="mt-4 bg-night-950 text-slate-100 rounded-xl p-4 overflow-x-auto font-mono text-sm border border-night-600/60">
                {exercise.solution}
              </pre>
            )}
          </div>
        </div>

        {/* Right panel: Code editor */}
        <div className="space-y-4">
          {/* Editor */}
          <div className="card overflow-hidden">
            <div className="bg-night-900 px-4 py-2 flex items-center justify-between border-b border-night-600/60">
              <span className="text-slate-300 text-sm font-mono">main.py</span>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-danger/70"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-flame/70"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-volt/70 mr-2"></span>
                <button
                  onClick={runCode}
                  disabled={isRunning || loadingPyodide}
                  className={`px-4 py-1.5 rounded text-sm font-semibold transition-all ${
                    isRunning || loadingPyodide
                      ? 'bg-night-600 text-slate-500 cursor-not-allowed'
                      : 'bg-volt text-night-950 hover:bg-volt-soft hover:shadow-[0_0_16px_-4px_rgba(52,211,153,0.7)]'
                  }`}
                >
                  {loadingPyodide ? 'Cargando Python...' : isRunning ? 'Ejecutando...' : '▶ Ejecutar'}
                </button>
              </div>
            </div>
            <Editor
              height="400px"
              language="python"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || '')}
              onMount={handleEditorDidMount}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                automaticLayout: true,
                tabSize: 4,
                insertSpaces: true,
                renderWhitespace: 'selection',
              }}
            />
          </div>

          {/* Output */}
          <div className="card overflow-hidden">
            <div className="bg-night-900 px-4 py-2 border-b border-night-600/60">
              <span className="text-slate-300 text-sm font-mono">Salida</span>
            </div>
            <div className="p-4 bg-night-950 text-slate-100 font-mono text-sm h-48 overflow-y-auto whitespace-pre-wrap border-t border-night-600/40">
              {output || 'Haz clic en "Ejecutar" para ver la salida...'}
            </div>
          </div>

          {/* Quick actions */}
          <div className="flex space-x-3">
            <button
              onClick={() => setCode(exercise.starterCode)}
              className="flex-1 px-4 py-2 bg-night-700 text-slate-200 rounded-lg font-medium hover:bg-night-600 hover:text-white transition-all"
            >
              Reiniciar código
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(code)
              }}
              className="flex-1 px-4 py-2 bg-night-700 text-slate-200 rounded-lg font-medium hover:bg-night-600 hover:text-white transition-all"
            >
              Copiar código
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Link
          to={`/student/week/${exercise.week}`}
          className="flex items-center space-x-2 text-slate-400 hover:text-neon transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Volver a Semana {exercise.week}</span>
        </Link>
      </div>
    </div>
  )
}
