import moment from 'moment'

export function parsedData(stringDate: string): string {
  const date = new Date().getDate()
  const getDayOfStringDate = Number(stringDate.substring(0, 2))
  const parsedDate = moment(stringDate).format('hh:MM:ss')

  if (date === getDayOfStringDate) {
    return `Hoje às ${parsedDate}`
  } else if (date < getDayOfStringDate) {
    const [year, time] = stringDate.split(' ')
    return `Ontem às ${time}`
  } else {
    return ` ${moment(stringDate).format('DD/MM/YYYY')} - ${moment(
      stringDate,
    ).format('hh:MM:ss')}`
  }
}
