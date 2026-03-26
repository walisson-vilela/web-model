import { RowComponent } from '../../../../../../../../../components/GridSelector/interfaces'
import { User } from '../../../../interfaces'

import * as S from './styled'

const Row: RowComponent<User> = (props) => {
  const {
    data: { name, role_name },
  } = props
  return (
    <>
      <S.RowTitle>{name}</S.RowTitle>
      <S.RowBody>{role_name}</S.RowBody>
    </>
  )
}

export default Row
