import { formatIntervalDate } from '../../../../functions'
import usePresenceListHistoryContext from '../../context'

import Manager from './components/Manager'
import * as S from './styles'

const Body = () => {
  const { card } = usePresenceListHistoryContext()
  return (
    <S.Container>
      <div className='title'>
        <span className='label'>
          Evento: <b> {card.name} </b> | Tipo: <b> {card.type_label} </b>
        </span>

        <span>
          {formatIntervalDate(
            card.starts_at.toString(),
            card.ends_at.toString(),
          )}
        </span>
      </div>

      <Manager />
    </S.Container>
  )
}

export default Body
