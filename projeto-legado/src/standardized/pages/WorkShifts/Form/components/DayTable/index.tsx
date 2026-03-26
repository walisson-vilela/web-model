import { Header } from './components/Header'
import { Scroll } from './components/Scroll'
import { DayTableWrapper } from './style'

const days = (() => {
  const intl = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' })
  const d = new Date()
  const w = d.getDay()
  d.setDate(d.getDate() + 6 - w)

  const weekdays = [...Array(7).fill(1)].map((day, value) => {
    d.setDate(d.getDate() + day)
    const str = intl.format(d)
    return { label: `${str[0].toUpperCase()}${str.substring(1, 3)}`, value }
  })

  weekdays[0].value = 7

  return weekdays
})()

export const DayTable = () => {
  return (
    <DayTableWrapper>
      <Header days={days} />
      <Scroll days={days} />
    </DayTableWrapper>
  )
}
