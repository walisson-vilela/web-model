import moment from 'moment'

export const formatPeriod = (
  starts_at: Date,
  ends_at?: Date | null,
): string => {
  const start = moment(starts_at)
  const end = ends_at ? moment(ends_at) : null

  const sameDay = end && start.isSame(end, 'day')
  const startIsMidnight = start.format('HH:mm') === '00:00'
  const endIsLateNight = end && end.format('HH:mm') === '23:59'

  if (!end) {
    // Só início
    return startIsMidnight
      ? `${start.format('DD/MM/YYYY')}`
      : `${start.format('DD/MM/YYYY')} (${start.format('HH:mm')})`
  }

  if (sameDay) {
    // Mesmo dia
    if (startIsMidnight && endIsLateNight) {
      return `${start.format('DD/MM/YYYY')} à ${end.format('DD/MM/YYYY')}`
    }
    if (startIsMidnight && !endIsLateNight) {
      return `${start.format('DD/MM/YYYY')} à ${end.format(
        'DD/MM/YYYY',
      )} (${end.format('HH:mm')})`
    }
    if (!startIsMidnight && endIsLateNight) {
      return `${start.format('DD/MM/YYYY')} (${start.format(
        'HH:mm',
      )}) à ${end.format('DD/MM/YYYY')}`
    }
    // Ambos tem hora
    return `${start.format('DD/MM/YYYY')} (${start.format(
      'HH:mm',
    )}) à ${end.format('DD/MM/YYYY')} (${end.format('HH:mm')})`
  } else {
    // Dias diferentes
    const startStr = startIsMidnight
      ? `${start.format('DD/MM/YYYY')}`
      : `${start.format('DD/MM/YYYY')} (${start.format('HH:mm')})`
    const endStr = endIsLateNight
      ? `${end.format('DD/MM/YYYY')}`
      : `${end.format('DD/MM/YYYY')} (${end.format('HH:mm')})`
    return `${startStr} à ${endStr}`
  }
}
