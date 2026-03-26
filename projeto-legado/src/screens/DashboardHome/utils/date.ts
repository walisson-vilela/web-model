const WEEKDAY_LABELS = [
  'Domingo',
  'Segunda-Feira',
  'Terça-Feira',
  'Quarta-Feira',
  'Quinta-Feira',
  'Sexta-Feira',
  'Sábado',
]

export const formatDashboardDateLabel = (dateISO: string) => {
  const date = new Date(dateISO)

  if (Number.isNaN(date.getTime())) return ''

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
