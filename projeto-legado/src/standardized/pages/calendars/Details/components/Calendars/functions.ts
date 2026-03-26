export const getMonths = (year: number, group: 1 | 2 | 3 | 4 | 6 | 12) => {
  let start = new Date()
  start.setFullYear(year)
  start.setMonth(0)
  start.setDate(1)
  start.setHours(0, 0, 0, 0)

  const months: { min: Date; max: Date }[] = []

  do {
    const end = new Date(start)
    end.setMonth(start.getMonth() + 1)
    end.setDate(0)
    start.setHours(23, 59, 59, 999)

    months.push({ min: start, max: end })

    start = new Date(start)
    start.setMonth(start.getMonth() + 1)
  } while (start.getFullYear() === year)

  return months.reduce((months, month, index) => {
    months[Math.floor(index / group)] = [
      ...months[Math.floor(index / group)],
      month,
    ]
    return [...months]
  }, Array(months.length / group).fill([]) as (typeof months)[])
}
