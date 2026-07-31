import { Link } from 'react-router-dom'
import { useProgress } from '../contexts/ProgressContext'
import { weekInfo } from '../data/lessons'

export default function HomePage() {
  const { getWeekProgress, getTotalProgress } = useProgress()
  const { lessonsCompleted, exercisesCompleted } = getTotalProgress()

  return (
    <div className="space-y-8">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-4">Curso de Introducción a Python</h1>
        <p className="text-blue-100 text-lg mb-6">
          Aprende los fundamentos de programación desde cero. 4 semanas, 26 temas, 18 ejercicios prácticos.
        </p>
        <div className="flex space-x-4">
          <Link
            to="/week/1"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Comenzar Curso
          </Link>
          <Link
            to="/dashboard"
            className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
          >
            Ver Progreso
          </Link>
        </div>
      </div>

      {/* Progress overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Temas Completados</p>
              <p className="text-3xl font-bold text-gray-900">{lessonsCompleted}/26</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">📚</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${(lessonsCompleted / 26) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Ejercicios Resueltos</p>
              <p className="text-3xl font-bold text-gray-900">{exercisesCompleted}/18</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${(exercisesCompleted / 18) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Progreso Total</p>
              <p className="text-3xl font-bold text-gray-900">
                {Math.round(((lessonsCompleted + exercisesCompleted) / (26 + 18)) * 100)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{ width: `${((lessonsCompleted + exercisesCompleted) / (26 + 18)) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Weeks grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Semanas del Curso</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {weekInfo.map((week) => {
            const progress = getWeekProgress(week.week)
            return (
              <Link
                key={week.week}
                to={`/week/${week.week}`}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-3">
                      Semana {week.week}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{week.title}</h3>
                    <p className="text-gray-600">{week.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">
                      {progress.lessonsCompleted} temas
                    </div>
                    <div className="text-sm text-gray-500">
                      {progress.exercisesCompleted} ejercicios
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${((progress.lessonsCompleted + progress.exercisesCompleted) / 10) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Info section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Sobre el Curso</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Objetivo</h3>
            <p className="text-gray-600">
              Que los participantes aprendan los fundamentos de programación con Python, desde cero absoluto, siendo capaces de escribir programas básicos que resuelvan problemas cotidianos usando variables, condicionales y bucles.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Dirigido a</h3>
            <p className="text-gray-600">
              Comunidad adolescente-adulta de la Parroquia Santa Lucía, Municipio Maracaibo, Estado Zulia. No se requieren conocimientos previos de programación.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Duración</h3>
            <p className="text-gray-600">
              4 semanas (40 horas totales). Miércoles a Sábado, 8:00 am – 5:00 pm.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Ubicación</h3>
            <p className="text-gray-600">
              Biblioteca del Estado Zulia María Calcaño, Parroquia Santa Lucía, Maracaibo.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
