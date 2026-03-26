import type {
  StepComponent,
  StepComponentAttributes,
  StepComponentComponent,
} from '../../types'

import Left from './Left'
import Right from './Right'
import * as S from './styles'

const EventsStep: StepComponent = Object.assign<
  StepComponentComponent,
  StepComponentAttributes
>(
  () => {
    return (
      <S.Container>
        <Left />
        <div />
        <Right />
      </S.Container>
    )
  },
  {
    title: 'Defina o Período e Datas',
    validator: (value, errors) => {
      return value.events.length > 0 && !('events' in errors)
    },
  },
)

export default EventsStep
