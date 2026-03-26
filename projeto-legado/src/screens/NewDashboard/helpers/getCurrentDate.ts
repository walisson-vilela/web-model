const date = new Date()
const currentDate = date.toISOString().slice(0, 10)
const day = date.getDay()
const weekDay = new Array(6)
weekDay[0] = 'D'
weekDay[1] = 'S'
weekDay[2] = 'T'
weekDay[3] = 'Q'
weekDay[4] = 'Q'
weekDay[5] = 'S'
weekDay[6] = 'S'

export { currentDate, weekDay, day }
