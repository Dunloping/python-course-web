import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { lessons } from '../../data/lessons'
import { exercises } from '../../data/exercises'

export default function StudentProgressPage() {
  const { users } = useAuth()
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)

  const students = users.filter(u => u.role === 'student')
  const selectedUser = students.find(s => s.id === selectedStudent)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Progreso de Estudiantes</h1>
        <p className="text-slate-400 mt-1">Seguimiento individual del avance en el curso</p>
      </div>

      {/* Student selector */}
      <div className="card p-4">
        <label className="field-label mb-2">Seleccionar Estudiante</label>
        <select
          value={selectedStudent || ''}
          onChange={(e) => setSelectedStudent(e.target.value || null)}
          className="input"
        >
          <option value="" className="bg-night-900">Todos los estudiantes ({students.length})</option>
          {students.map(s => (
            <option key={s.id} value={s.id} className="bg-night-900">{s.name} — {s.email}</option>
          ))}
        </select>
      </div>

      {/* All students overview */}
      {!selectedStudent && (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-night-600/50">
              <thead className="bg-night-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neon uppercase tracking-wider">Estudiante</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neon uppercase tracking-wider">Edad</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neon uppercase tracking-wider">Temas</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neon uppercase tracking-wider">Ejercicios</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neon uppercase tracking-wider">Progreso</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neon uppercase tracking-wider">Último Acceso</th>
                </tr>
              </thead>
              <tbody className="bg-night-800/50 divide-y divide-night-600/40">
                {students.map((student) => {
                  const lessonsCompleted = student.progress?.completedLessons?.length || 0
                  const exercisesCompleted = Object.values(student.progress?.exerciseResults || {}).filter(r => r.completed).length
                  const totalItems = lessons.length + exercises.length
                  const completedItems = lessonsCompleted + exercisesCompleted
                  const pct = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0

                  return (
                    <tr
                      key={student.id}
                      className="hover:bg-night-700/50 transition-colors cursor-pointer"
                      onClick={() => setSelectedStudent(student.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-night-700 border border-night-600/50 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-neon">
                              {student.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-slate-100">{student.name}</div>
                            <div className="text-sm text-slate-500">{student.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                        {student.age ? `${student.age} años` : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                        <span className="text-neon font-mono">{lessonsCompleted}</span>/{lessons.length}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                        <span className="text-volt font-mono">{exercisesCompleted}</span>/{exercises.length}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="flex-1 progress-track h-2">
                            <div className="progress-fill" style={{ width: `${pct}%` }}></div>
                          </div>
                          <span className="text-xs text-slate-400 w-10 text-right">{pct}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {student.lastLogin ? new Date(student.lastLogin).toLocaleDateString('es-VE') : '-'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {students.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500">No hay estudiantes registrados</p>
            </div>
          )}
        </div>
      )}

      {/* Individual student detail */}
      {selectedUser && (
        <div className="space-y-6">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-neon/10 border border-neon/30 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-neon">
                    {selectedUser.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-100">{selectedUser.name}</h2>
                  <p className="text-slate-400">{selectedUser.email} · {selectedUser.age ? `${selectedUser.age} años` : 'Sin edad'}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-sm text-neon hover:text-neon-soft transition-colors"
              >
                ← Volver a la lista
              </button>
            </div>

            {/* Summary stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Temas Completados', value: selectedUser.progress?.completedLessons?.length || 0, total: lessons.length, color: 'neon' },
                { label: 'Ejercicios Resueltos', value: Object.values(selectedUser.progress?.exerciseResults || {}).filter(r => r.completed).length, total: exercises.length, color: 'volt' },
                { label: 'Intentos Totales', value: Object.values(selectedUser.progress?.exerciseResults || {}).reduce((a, r) => a + r.attempts, 0), total: null, color: 'flame-soft' },
                { label: 'Último Acceso', value: selectedUser.lastLogin ? new Date(selectedUser.lastLogin).toLocaleDateString('es-VE') : '-', total: null, color: 'ghost-soft' },
              ].map((stat, i) => (
                <div key={i} className="bg-night-900 border border-night-600/40 rounded-xl p-4">
                  <p className="text-xs text-slate-500 mb-1">{stat.label}</p>
                  <p className={`text-2xl font-bold text-${stat.color}`}>
                    {stat.total !== null ? `${stat.value}/${stat.total}` : stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Lessons detail */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Temas por Semana</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4].map(week => {
                const weekLessons = lessons.filter(l => l.week === week)
                const completed = weekLessons.filter(l => selectedUser.progress?.completedLessons?.includes(l.id)).length
                return (
                  <div key={week}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">Semana {week}</span>
                      <span className="font-medium text-slate-200">{completed}/{weekLessons.length} temas</span>
                    </div>
                    <div className="progress-track h-2">
                      <div className="progress-fill" style={{ width: `${weekLessons.length > 0 ? (completed / weekLessons.length) * 100 : 0}%` }}></div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {weekLessons.map(l => {
                        const done = selectedUser.progress?.completedLessons?.includes(l.id)
                        return (
                          <span
                            key={l.id}
                            className={`text-xs px-2 py-1 rounded-full border ${
                              done
                                ? 'bg-volt/10 text-volt border-volt/30'
                                : 'bg-night-900 text-slate-500 border-night-600/50'
                            }`}
                          >
                            {done ? '✓' : '○'} {l.title}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Exercises detail */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Ejercicios</h3>
            <div className="space-y-3">
              {exercises.map(ex => {
                const result = selectedUser.progress?.exerciseResults?.[ex.id]
                return (
                  <div key={ex.id} className="flex items-center justify-between p-3 bg-night-900 border border-night-600/40 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                        result?.completed
                          ? 'bg-volt/10 border-volt/40 text-volt'
                          : 'bg-night-800 border-night-600/50 text-slate-500'
                      }`}>
                        {result?.completed ? '✓' : '>'}
                      </div>
                      <div>
                        <span className="font-medium text-slate-200">{ex.title}</span>
                        <span className="text-xs text-slate-500 ml-2">Semana {ex.week}</span>
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      {result ? (
                        <>
                          <span className={result.completed ? 'text-volt' : 'text-flame-soft'}>
                            {result.completed ? 'Completado' : 'En progreso'}
                          </span>
                          <span className="text-slate-500 ml-2">{result.attempts} intento{result.attempts > 1 ? 's' : ''}</span>
                        </>
                      ) : (
                        <span className="text-slate-500">Sin intentar</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
