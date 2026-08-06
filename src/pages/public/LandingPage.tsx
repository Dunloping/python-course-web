import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { COURSE_CONFIG } from '../../data/config'
import { getNextClassInfo } from '../../lib/schedule'

export default function LandingPage() {
  const { isAuthenticated, getSpotsRemaining } = useAuth()
  const spots = getSpotsRemaining()
  const classInfo = getNextClassInfo()
  
  const [sy, sm, sd] = COURSE_CONFIG.startDate.split('-').map(Number)
  const startDate = new Date(sy, sm - 1, sd)
  const formattedDate = startDate.toLocaleDateString('es-VE', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  return (
    <div className="min-h-screen">
      {/* Hero Section with curso.jpeg */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/curso.jpeg)' }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {COURSE_CONFIG.shortName}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Aprende programación desde cero con Python
          </p>
          
          {/* Course Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl mb-2">📅</div>
              <div className="text-sm text-gray-300">Inicio</div>
              <div className="font-semibold">1 de Agosto 2026</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl mb-2">⏰</div>
              <div className="text-sm text-gray-300">Horario</div>
              <div className="font-semibold">Sáb 9:00 - 10:30 AM</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl mb-2">👥</div>
              <div className="text-sm text-gray-300">Cupos</div>
              <div className={`font-semibold ${spots === 0 ? 'text-red-400' : 'text-green-400'}`}>
                {spots > 0 ? `${spots} disponibles` : 'COMPLETO'}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl mb-2">🎓</div>
              <div className="text-sm text-gray-300">Edades</div>
              <div className="font-semibold">{COURSE_CONFIG.minAge} - {COURSE_CONFIG.maxAge} años</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="bg-neon hover:bg-neon-soft text-night-950 px-8 py-4 rounded-lg text-lg font-bold transition-all hover:shadow-[0_0_30px_-4px_rgba(34,211,238,0.8)]"
              >
                Ir a Mi Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="bg-neon hover:bg-neon-soft text-night-950 px-8 py-4 rounded-lg text-lg font-bold transition-all hover:shadow-[0_0_30px_-4px_rgba(34,211,238,0.8)]"
                >
                  Inscribirse Gratis
                </Link>
                <Link
                  to="/login"
                  className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors border border-white/30 backdrop-blur-sm"
                >
                  Ya tengo cuenta
                </Link>
              </>
            )}
          </div>

          {/* Dynamic class countdown */}
          <div className={`mt-8 inline-block px-6 py-3 rounded-full text-lg font-semibold backdrop-blur-sm border ${
            classInfo.type === 'today'
              ? 'bg-volt/20 border-volt/50 text-volt shadow-[0_0_20px_-4px_rgba(52,211,153,0.6)]'
              : classInfo.type === 'before' && classInfo.daysUntil <= 2
                ? 'bg-flame/20 border-flame/50 text-flame-soft shadow-[0_0_20px_-4px_rgba(251,146,60,0.5)]'
                : 'bg-white/10 border-white/20 text-white'
          }`}>
            {classInfo.type === 'today' ? '📚 ' : classInfo.type === 'before' && classInfo.daysUntil <= 2 ? '🔥 ' : '📅 '}
            {classInfo.message}
          </div>
        </div>
      </section>

      {/* Course Details Section */}
      <section className="py-16 bg-night-900/60 border-y border-night-600/40">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-100 mb-12">
            Sobre el Curso <span className="text-neon">▸</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Description */}
            <div>
              <h3 className="text-2xl font-semibold text-slate-100 mb-4">
                Python de Cero a tu Primer Proyecto
              </h3>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Aprende los fundamentos de programación con Python desde cero absoluto.
                En 4 sesiones prácticas, serás capaz de escribir programas básicos que
                resuelvan problemas cotidianos usando variables, condicionales y bucles.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-slate-300">
                  <span className="text-volt mr-3">✓</span>
                  <span>Sin conocimientos previos requeridos</span>
                </div>
                <div className="flex items-center text-slate-300">
                  <span className="text-volt mr-3">✓</span>
                  <span>4 sesiones prácticas (sábados)</span>
                </div>
                <div className="flex items-center text-slate-300">
                  <span className="text-volt mr-3">✓</span>
                  <span>Ejercicios interactivos en línea</span>
                </div>
                <div className="flex items-center text-slate-300">
                  <span className="text-volt mr-3">✓</span>
                  <span>Certificado de participación</span>
                </div>
                <div className="flex items-center text-slate-300">
                  <span className="text-volt mr-3">✓</span>
                  <span>100% gratuito</span>
                </div>
              </div>
            </div>

            {/* Right: Info Card */}
            <div className="card p-8 relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-56 h-56 bg-neon/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="relative z-10 text-center mb-6">
                <div className="chip-neon mb-4">
                  {COURSE_CONFIG.organizer}
                </div>
                <h4 className="text-xl font-semibold text-slate-100">
                  Información del Curso
                </h4>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-night-600/40">
                  <span className="text-slate-400">Inicio:</span>
                  <span className="font-medium text-slate-200">{formattedDate}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-night-600/40">
                  <span className="text-slate-400">Horario:</span>
                  <span className="font-medium text-slate-200">{COURSE_CONFIG.schedule}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-night-600/40">
                  <span className="text-slate-400">Duración:</span>
                  <span className="font-medium text-slate-200">{COURSE_CONFIG.duration} semanas</span>
                </div>
                <div className="flex justify-between py-2 border-b border-night-600/40">
                  <span className="text-slate-400">Cupos:</span>
                  <span className={`font-medium ${spots === 0 ? 'text-danger' : 'text-volt'}`}>
                    {spots > 0 ? `${spots} de ${COURSE_CONFIG.maxParticipants} disponibles` : 'COMPLETO'}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-night-600/40">
                  <span className="text-slate-400">Edades:</span>
                  <span className="font-medium text-slate-200">{COURSE_CONFIG.minAge} - {COURSE_CONFIG.maxAge} años</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-400">Costo:</span>
                  <span className="font-medium text-volt">GRATUITO</span>
                </div>
              </div>

              <div className="mt-6">
                {spots > 0 && !isAuthenticated ? (
                  <Link
                    to="/register"
                    className="neon-btn w-full"
                  >
                    Inscribirse Ahora
                  </Link>
                ) : isAuthenticated ? (
                  <Link
                    to="/dashboard"
                    className="w-full inline-flex justify-center bg-volt text-night-950 hover:bg-volt-soft text-center py-3 rounded-lg font-semibold transition-all hover:shadow-[0_0_20px_-4px_rgba(52,211,153,0.7)]"
                  >
                    Ir a Mi Dashboard
                  </Link>
                ) : (
                  <div className="bg-danger/10 text-danger text-center py-3 rounded-lg font-semibold border border-danger/40">
                    No hay cupos disponibles
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-100 mb-12">
            ¿Qué Aprenderás? <span className="text-neon">▸</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card p-6 text-center card-hover">
              <div className="w-16 h-16 bg-neon/10 border border-neon/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💻</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Fundamentos</h3>
              <p className="text-slate-400 text-sm">
                Variables, tipos de datos y operaciones básicas
              </p>
            </div>

            <div className="card p-6 text-center card-hover">
              <div className="w-16 h-16 bg-volt/10 border border-volt/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔀</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Condicionales</h3>
              <p className="text-slate-400 text-sm">
                Toma decisiones con if, elif y else
              </p>
            </div>

            <div className="card p-6 text-center card-hover">
              <div className="w-16 h-16 bg-ghost/10 border border-ghost/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔄</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Bucles</h3>
              <p className="text-slate-400 text-sm">
                Repite acciones con for y while
              </p>
            </div>

            <div className="card p-6 text-center card-hover">
              <div className="w-16 h-16 bg-flame/10 border border-flame/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Proyecto Final</h3>
              <p className="text-slate-400 text-sm">
                Aplica lo aprendido en un proyecto real
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-night-900/80 border-t border-night-600/60 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-slate-400 mb-2">
            Proyecto de Servicio Comunitario 2026-2N
          </p>
          <p className="text-slate-400 mb-4">
            Instituto Universitario de Tecnología READIC UNIR
          </p>
          <p className="text-sm text-slate-500">
            {COURSE_CONFIG.organizer}
          </p>
        </div>
      </footer>
    </div>
  )
}
