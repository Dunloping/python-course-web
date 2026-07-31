import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { useProgress } from '../contexts/ProgressContext'
import { lessons } from '../data/lessons'
import { exercises } from '../data/exercises'

export default function LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>()
  const { progress, completeLesson } = useProgress()
  
  const lesson = lessons.find(l => l.id === lessonId)
  
  if (!lesson) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Tema no encontrado</h2>
        <Link to="/" className="text-blue-600 hover:underline mt-4 block">
          Volver al inicio
        </Link>
      </div>
    )
  }

  const isCompleted = progress.completedLessons.includes(lesson.id)
  
  // Find next lesson
  const currentIndex = lessons.findIndex(l => l.id === lesson.id)
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null
  
  // Find related exercises
  const relatedExercises = exercises.filter(e => e.lessonId === lesson.id)

  const handleComplete = () => {
    completeLesson(lesson.id)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <Link to="/" className="hover:text-blue-600">Inicio</Link>
        <span>/</span>
        <Link to={`/week/${lesson.week}`} className="hover:text-blue-600">
          Semana {lesson.week}
        </Link>
        <span>/</span>
        <span className="text-gray-900">{lesson.title}</span>
      </div>

      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-start justify-between">
          <div>
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-3">
              Semana {lesson.week} · Tema {lesson.id}
            </span>
            <h1 className="text-3xl font-bold text-gray-900">{lesson.title}</h1>
          </div>
          <button
            onClick={handleComplete}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isCompleted
                ? 'bg-green-100 text-green-700'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isCompleted ? '✓ Completado' : 'Marcar como completado'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown
            components={{
              h1: ({ children }) => <h1 className="text-3xl font-bold text-gray-900 mb-4">{children}</h1>,
              h2: ({ children }) => <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{children}</h2>,
              h3: ({ children }) => <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{children}</h3>,
              h4: ({ children }) => <h4 className="text-lg font-semibold text-gray-900 mt-4 mb-2">{children}</h4>,
              p: ({ children }) => <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>,
              ul: ({ children }) => <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-2">{children}</ol>,
              li: ({ children }) => <li className="text-gray-700">{children}</li>,
              strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
              em: ({ children }) => <em className="italic text-gray-700">{children}</em>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 text-gray-700 italic my-4">
                  {children}
                </blockquote>
              ),
              code: ({ children, className }) => {
                const isInline = !className
                if (isInline) {
                  return <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">{children}</code>
                }
                return <code className={className}>{children}</code>
              },
              pre: ({ children }) => (
                <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto my-4">
                  {children}
                </pre>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto my-4">
                  <table className="min-w-full divide-y divide-gray-200">
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children }) => <thead className="bg-gray-50">{children}</thead>,
              tbody: ({ children }) => <tbody className="divide-y divide-gray-200">{children}</tbody>,
              tr: ({ children }) => <tr className="hover:bg-gray-50">{children}</tr>,
              th: ({ children }) => (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{children}</td>
              ),
            }}
          >
            {lesson.content}
          </ReactMarkdown>
        </div>
      </div>

      {/* Related exercises */}
      {relatedExercises.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Ejercicios Relacionados</h2>
          <div className="space-y-3">
            {relatedExercises.map(exercise => {
              const result = progress.exerciseResults[exercise.id]
              return (
                <Link
                  key={exercise.id}
                  to={`/exercise/${exercise.id}`}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      result?.completed ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {result?.completed ? '✓' : '>'}
                    </div>
                    <span className="font-medium text-gray-900">{exercise.title}</span>
                  </div>
                  <span className="text-sm text-gray-500">
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
          to={`/week/${lesson.week}`}
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Volver a Semana {lesson.week}</span>
        </Link>
        {nextLesson && (
          <Link
            to={`/lesson/${nextLesson.id}`}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
          >
            <span>Siguiente: {nextLesson.title}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  )
}
