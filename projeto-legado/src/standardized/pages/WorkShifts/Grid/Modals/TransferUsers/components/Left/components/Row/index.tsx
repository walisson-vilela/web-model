import { MwEllipsisContainer } from '@mw-kit/mw-ui'

import { RowComponent } from '../../../../../../../../../../components/GridSelector/interfaces'
import { User } from '../../../../interfaces'

import * as S from './styled'

const Row: RowComponent<User> = (props) => {
  const {
    data: { name, person, role },
  } = props

  return (
    <S.RowContainer>
      <S.RowTitle>{name}</S.RowTitle>

      <S.RowSubtitle>
        <S.RowSubtitleItem>
          Matrícula:
          <MwEllipsisContainer children={person.registration || '-'} />
        </S.RowSubtitleItem>
        |<MwEllipsisContainer children={role.name || '-'} />|
        <S.RowSubtitleItem>PIS: {person.pis ? 'Sim' : 'Não'}</S.RowSubtitleItem>
      </S.RowSubtitle>
    </S.RowContainer>
  )
}

export default Row
