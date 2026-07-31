import { useState, useRef, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Editor from '@monaco-editor/react'
import { useProgress } from '../contexts/ProgressContext'
import { exercises } from '../data/exercises'

export default function ExercisePage() {
  const { exerciseId } = useParams<{ exerciseId: string }>()
  const { progress, completeExercise } = useProgress()
  
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

    try {
      // Redirect stdout to capture output
      py.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
`)
      
      // Run user code
      let userCode = code
      
      // If exercise has input() calls, we need to mock them
      // For now, we'll just run the code and see if it produces output
      try {
        py.runPython(userCode)
        
        // Get captured output
        const stdout = py.runPython('sys.stdout.getvalue()')
        setOutput(stdout || '(Sin salida)')
        
        // Check if solution matches
        if (stdout.trim()) {
          // Simple validation: check if output contains expected keywords
          const passed = exercise.tests.some(test => 
            stdout.includes(test.expected) || 
            test.expected.split('\n').every(line => stdout.includes(line))
          )
          
          if (passed) {
            completeExercise(exercise.id, 100)
            setOutput(prev => prev + '\n\n✅ ¡Correcto! Ejercicio completado.')
          } else {
            setOutput(prev => prev + '\n\n⚠️ La salida no coincide con lo esperado. Revisá tu código.')
          }
        }
      } catch (error: any) {
        setOutput(`Error: ${error.message}`)
      }
    } catch (error: any) {
      setOutput(`Error: ${error.message}`)
    } finally {
      setIsRunning(false)
    }
  }

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor
  }

  if (!exercise) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Ejercicio no encontrado</h2>
        <Link to="/" className="text-blue-600 hover:underline mt-4 block">
          Volver al inicio
        </Link>
      </div>
    )
  }

  const result = progress.exerciseResults[exercise.id]

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <Link to="/" className="hover:text-blue-600">Inicio</Link>
        <span>/</span>
        <Link to={`/week/${exercise.week}`} className="hover:text-blue-600">
          Semana {exercise.week}
        </Link>
        <span>/</span>
        <span className="text-gray-900">{exercise.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left panel: Exercise info */}
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-block px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded-full mb-3">
                  Ejercicio · Semana {exercise.week}
                </span>
                <h1 className="text-2xl font-bold text-gray-900">{exercise.title}</h1>
              </div>
              {result?.completed && (
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-xl">✓</span>
                </div>
              )}
            </div>
            <p className="mt-4 text-gray-600">{exercise.description}</p>
            
            {result && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">
                  Intentos: <span className="font-medium">{result.attempts}</span>
                  {result.completed && (
                    <span className="ml-4 text-green-600 font-medium">✓ Completado</span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Expected output */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Salida esperada</h2>
            <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm">
              {exercise.tests.map((test, i) => (
                <div key={i} className="mb-2 last:mb-0">
                  <div className="text-gray-500 text-xs mb-1">Entrada: {test.input}</div>
                  <div className="text-green-400">{test.expected}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hints */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <button
              onClick={() => setShowHints(!showHints)}
              className="flex items-center justify-between w-full text-left"
            >
              <h2 className="text-lg font-semibold text-gray-900">Pistas</h2>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${showHints ? 'rotate-180' : ''}`}
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
                  <li key={i} className="flex items-start space-x-2 text-gray-600">
                    <span className="text-blue-500 mt-1">💡</span>
                    <span>{hint}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Solution */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="flex items-center justify-between w-full text-left"
            >
              <h2 className="text-lg font-semibold text-gray-900">Solución</h2>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${showSolution ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showSolution && (
              <pre className="mt-4 bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto font-mono text-sm">
                {exercise.solution}
              </pre>
            )}
          </div>
        </div>

        {/* Right panel: Code editor */}
        <div className="space-y-4">
          {/* Editor */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
              <span className="text-gray-300 text-sm font-mono">main.py</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={runCode}
                  disabled={isRunning || loadingPyodide}
                  className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${
                    isRunning || loadingPyodide
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-800 px-4 py-2">
              <span className="text-gray-300 text-sm font-mono">Salida</span>
            </div>
            <div className="p-4 bg-gray-900 text-gray-100 font-mono text-sm h-48 overflow-y-auto whitespace-pre-wrap">
              {output || 'Haz clic en "Ejecutar" para ver la salida...'}
            </div>
          </div>

          {/* Quick actions */}
          <div className="flex space-x-3">
            <button
              onClick={() => setCode(exercise.starterCode)}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Reiniciar código
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(code)
              }}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Copiar código
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Link
          to={`/week/${exercise.week}`}
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
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
