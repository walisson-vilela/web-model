const currentDay = new Date()
const firstDayCalculate = currentDay.getDate() - currentDay.getDay()
const lastDayCalculate = firstDayCalculate + 6

export const firstDayWeek = new Date(currentDay.setDate(firstDayCalculate))
  .toISOString()
  .slice(0, 10)
export const lastDayWeek = new Date(currentDay.setDate(lastDayCalculate))
  .toISOString()
  .slice(0, 10)
