import { COURSE_CONFIG } from '../data/config'

export interface ClassSchedule {
  date: Date
  week: number
  label: string
}

function startOfDay(d: Date): Date {
  const r = new Date(d)
  r.setHours(0, 0, 0, 0)
  return r
}

export function getClassDates(): ClassSchedule[] {
  const start = new Date(COURSE_CONFIG.startDate + 'T09:00:00')
  const dates: ClassSchedule[] = []
  for (let i = 0; i < COURSE_CONFIG.duration; i++) {
    const d = new Date(start)
    d.setDate(d.getDate() + i * 7)
    dates.push({
      date: d,
      week: i + 1,
      label: d.toLocaleDateString('es-VE', { weekday: 'long', day: 'numeric', month: 'long' }),
    })
  }
  return dates
}

export function getNextClassInfo(now: Date = new Date()): {
  type: 'before' | 'today' | 'after'
  daysUntil: number
  message: string
  nextDate: ClassSchedule | null
  currentWeek: number
  totalWeeks: number
} {
  const today = startOfDay(now)
  const classes = getClassDates()

  for (const cls of classes) {
    const classDay = startOfDay(cls.date)
    const diff = Math.round((classDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    if (diff === 0) {
      return {
        type: 'today',
        daysUntil: 0,
        message: `¡Hoy es la clase! Semana ${cls.week} — ${cls.label}`,
        nextDate: cls,
        currentWeek: cls.week,
        totalWeeks: COURSE_CONFIG.duration,
      }
    }

    if (diff > 0) {
      let msg: string
      if (diff === 1) {
        msg = `¡Mañana es la clase! Semana ${cls.week}`
      } else if (diff <= 2) {
        msg = `¡Faltan ${diff} días para la clase! Semana ${cls.week}`
      } else {
        msg = `Faltan ${diff} días para la siguiente clase (${cls.label})`
      }
      return {
        type: 'before',
        daysUntil: diff,
        message: msg,
        nextDate: cls,
        currentWeek: cls.week,
        totalWeeks: COURSE_CONFIG.duration,
      }
    }
  }

  const last = classes[classes.length - 1]
  return {
    type: 'after',
    daysUntil: 0,
    message: '¡Curso finalizado! Gracias por participar.',
    nextDate: null,
    currentWeek: COURSE_CONFIG.duration,
    totalWeeks: COURSE_CONFIG.duration,
  }
}
