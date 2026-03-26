import { date } from '../../../../../../../../../services/parsers'
import * as T from '../../../types'

import * as S from './styles'

const Row = (props: { person: T.Person }) => {
  const { person } = props

  return (
    <S.Container>
      <S.Initials src={person.avatar} name={person.name} />

      <div>
        <div>{person.name || '-'}</div>

        <div>
          Função: {person.role ? person.role.name || '-' : '-'} | Aniversário:{' '}
          {date(person.birthday, '-', 'YYYY-MM-DD HH:mm:ss', 'DD/MM')}
        </div>
      </div>
    </S.Container>
  )
}

export default Row
