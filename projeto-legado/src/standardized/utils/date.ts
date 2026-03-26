const WEEKDAY_LABELS = [
  'Domingo',
  'Segunda-Feira',
  'Terça-Feira',
  'Quarta-Feira',
  'Quinta-Feira',
  'Sexta-Feira',
  'Sábado',
]

export const toLocalISODate = (date: Date) => {
  const adjusted = new Date(date.getTime())
  adjusted.setHours(adjusted.getHours() + 3)

  const year = adjusted.getFullYear()
  const month = (adjusted.getMonth() + 1).toString().padStart(2, '0')
  const day = adjusted.getDate().toString().padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const parseISODate = (dateISO: string) => {
  const [yearStr, monthStr, dayStr] = dateISO.split('-')

  const year = Number(yearStr)
  const month = Number(monthStr)
  const day = Number(dayStr)

  if (
    Number.isNaN(year) ||
    Number.isNaN(month) ||
    Number.isNaN(day) ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return null
  }

  const parsed = new Date(year, month - 1, day)
  if (Number.isNaN(parsed.getTime())) {
    return null
  }

  return parsed
}

export const formatSingleDateLabel = (dateISO: string) => {
  const date = parseISODate(dateISO)

  if (!date) return ''

  const today = new Date()
  const isToday =
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()

  const weekday = WEEKDAY_LABELS[date.getDay()]
  const formatted = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)

  if (isToday) {
    return `Hoje - ${weekday} ${formatted}`
  }

  return `${weekday} ${formatted}`
}
