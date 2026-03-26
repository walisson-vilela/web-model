import { BodyInterface } from '../../Grid/interface'

import { Week } from './interface'
import * as S from './styled'

interface IWeeklyRoutine {
  weekdays: BodyInterface['weekdays']
}

const WeeklyRoutine = (props: IWeeklyRoutine) => {
  const { weekdays } = props
  const isActive = weekdays.map((day) => day.weekday)
  return (
    <S.Container>
      {Object.values(Week)
        .sort((a, b) => {
          const order = [7, 1, 2, 3, 4, 5, 6]
          return order.indexOf(a.dayNumber) - order.indexOf(b.dayNumber)
        })
        .map((day, index) => (
          <S.WeekDay key={index} $active={isActive.includes(day.dayNumber)}>
            {day.label}
          </S.WeekDay>
        ))}
    </S.Container>
  )
}

export default WeeklyRoutine
