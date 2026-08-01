import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { useProgress } from '../contexts/ProgressContext'
import { lessons } from '../data/lessons'
import { exercises } from '../data/exercises'

export default function LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>()
  const { progress, completeLesson, isLessonUnlocked } = useProgress()
  
  const lesson = lessons.find(l => l.id === lessonId)
  
  if (!lesson) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-slate-100">Tema no encontrado</h2>
        <Link to="/" className="text-neon hover:underline mt-4 block">
          Volver al inicio
        </Link>
      </div>
    )
  }

  const isUnlocked = isLessonUnlocked(lesson.id)

  if (!isUnlocked) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-2xl font-bold text-slate-100 mb-2">Tema bloqueado</h2>
        <p className="text-slate-400 mb-6">
          Completá el tema anterior de la semana para desbloquear este contenido.
        </p>
        <Link
          to={`/student/week/${lesson.week}`}
          className="neon-btn"
        >
          Volver a la Semana {lesson.week}
        </Link>
      </div>
    )
  }

  const isCompleted = progress.completedLessons.includes(lesson.id)
  
  // Find next lesson
  const currentIndex = lessons.findIndex(l => l.id === lesson.id)
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null
  const nextUnlocked = nextLesson ? isLessonUnlocked(nextLesson.id) : false
  
  // Find related exercises
  const relatedExercises = exercises.filter(e => e.lessonId === lesson.id)

  const handleComplete = () => {
    completeLesson(lesson.id)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-slate-500">
        <Link to="/student" className="hover:text-neon transition-colors">Inicio</Link>
        <span>/</span>
        <Link to={`/student/week/${lesson.week}`} className="hover:text-neon transition-colors">
          Semana {lesson.week}
        </Link>
        <span>/</span>
        <span className="text-slate-300">{lesson.title}</span>
      </div>

      {/* Header */}
      <div className="card p-6 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-neon/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <span className="chip-neon mb-3">
              Semana {lesson.week} · Tema {lesson.id}
            </span>
            <h1 className="text-3xl font-bold text-slate-100">{lesson.title}</h1>
          </div>
          <button
            onClick={handleComplete}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              isCompleted
                ? 'bg-volt/10 text-volt border border-volt/40'
                : 'neon-btn'
            }`}
          >
            {isCompleted ? '✓ Completado' : 'Marcar como completado'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="card p-8">
        <div className="max-w-none">
          <ReactMarkdown
            components={{
              h1: ({ children }) => <h1 className="text-3xl font-bold text-slate-100 mb-4">{children}</h1>,
              h2: ({ children }) => <h2 className="text-2xl font-bold text-slate-100 mt-8 mb-4">{children}</h2>,
              h3: ({ children }) => <h3 className="text-xl font-semibold text-slate-100 mt-6 mb-3">{children}</h3>,
              h4: ({ children }) => <h4 className="text-lg font-semibold text-slate-100 mt-4 mb-2">{children}</h4>,
              p: ({ children }) => <p className="text-slate-300 mb-4 leading-relaxed">{children}</p>,
              ul: ({ children }) => <ul className="list-disc list-inside text-slate-300 mb-4 space-y-2">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal list-inside text-slate-300 mb-4 space-y-2">{children}</ol>,
              li: ({ children }) => <li className="text-slate-300">{children}</li>,
              strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
              em: ({ children }) => <em className="italic text-slate-300">{children}</em>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-neon/60 pl-4 py-3 bg-neon/5 text-slate-200 rounded-r-lg my-4">
                  {children}
                </blockquote>
              ),
              code: ({ children, className }) => {
                const isInline = !className
                if (isInline) {
                  return <code className="bg-night-700 text-neon-soft px-2 py-1 rounded text-sm font-mono border border-night-600/50">{children}</code>
                }
                return <code className={className}>{children}</code>
              },
              pre: ({ children }) => (
                <pre className="bg-night-950 text-slate-100 rounded-xl p-5 overflow-x-auto my-4 border border-night-600/60 shadow-[inset_0_0_30px_-20px_rgba(34,211,238,0.4)] font-mono">
                  {children}
                </pre>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto my-4">
                  <table className="min-w-full divide-y divide-night-600/50">
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children }) => <thead className="bg-night-900">{children}</thead>,
              tbody: ({ children }) => <tbody className="divide-y divide-night-600/40">{children}</tbody>,
              tr: ({ children }) => <tr className="hover:bg-night-700/50">{children}</tr>,
              th: ({ children }) => (
                <th className="px-6 py-3 text-left text-xs font-medium text-neon uppercase tracking-wider">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{children}</td>
              ),
            }}
          >
            {lesson.content}
          </ReactMarkdown>
        </div>
      </div>

      {/* Related exercises */}
      {relatedExercises.length > 0 && (
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-slate-100 mb-4">
            Ejercicios Relacionados <span className="text-volt">▸</span>
          </h2>
          <div className="space-y-3">
            {relatedExercises.map(exercise => {
              const result = progress.exerciseResults[exercise.id]
              return (
                <Link
                  key={exercise.id}
                  to={`/student/exercise/${exercise.id}`}
                  className="flex items-center justify-between p-4 bg-night-900 border border-night-600/40 rounded-xl hover:border-flame/50 hover:shadow-[0_0_20px_-8px_rgba(251,146,60,0.5)] transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                      result?.completed
                        ? 'bg-volt/10 border-volt/40 text-volt'
                        : 'bg-flame/10 border-flame/40 text-flame-soft'
                    }`}>
                      {result?.completed ? '✓' : '>'}
                    </div>
                    <span className="font-medium text-slate-200">{exercise.title}</span>
                  </div>
                  <span className="text-sm text-slate-500">
                    {result?.completed ? 'Completado' : 'Practicar'}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Link
          to={`/student/week/${lesson.week}`}
          className="flex items-center space-x-2 text-slate-400 hover:text-neon transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Volver a Semana {lesson.week}</span>
        </Link>
        {nextLesson && nextUnlocked && (
          <Link
            to={`/student/lesson/${nextLesson.id}`}
            className="flex items-center space-x-2 text-slate-400 hover:text-neon transition-colors"
          >
            <span>Siguiente: {nextLesson.title}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
        {nextLesson && !nextUnlocked && (
          <span className="flex items-center space-x-2 text-slate-500 cursor-not-allowed">
            <span>🔒 Siguiente: {nextLesson.title}</span>
          </span>
        )}
      </div>
    </div>
  )
}
