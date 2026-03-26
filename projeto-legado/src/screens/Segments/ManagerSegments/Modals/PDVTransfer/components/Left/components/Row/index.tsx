import { RowComponent } from '../../../../../../../../../components/GridSelector/interfaces'
import { Store } from '../../../../interfaces'

import * as S from './styled'

const Row: RowComponent<Store> = (props) => {
  const {
    data: { name, formatted_address },
  } = props
  return (
    <>
      <S.RowTitle>{name}</S.RowTitle>
      <S.RowBody>{formatted_address}</S.RowBody>
    </>
  )
}

export default Row
