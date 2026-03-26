import moment from 'moment'

function addMaskHourAndMinutes(value: string): string {
  let format = value.split(':')
  const [hours, minutes] = format
  let parseHour =
    Number(hours) <= 0
      ? ''
      : Number(hours) >= 1 && Number(hours) < 10
      ? String(hours[1])
      : Number(hours)
  if (format.length >= 2) {
    return `${parseHour !== '' ? `${parseHour}h e ${minutes}m` : `${minutes}m`}`
  }
}

export function convertMinutesToHoursAndMinutes(
  durationInMinutes: number,
): string {
  const formatTime = moment
    .utc()
    .startOf('day')
    .add({ minutes: durationInMinutes })
    .format('HH:mm')
  const parseFormat = addMaskHourAndMinutes(formatTime)
  return parseFormat
}
