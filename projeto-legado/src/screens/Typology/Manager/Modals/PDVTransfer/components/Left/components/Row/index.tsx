import { RowComponent } from '../../../../../../../../../components/GridSelector/interfaces'
import { PDV } from '../../../../interfaces'

import * as S from './styled'

const Row: RowComponent<PDV> = (props) => {
  const {
    data: { id, name, formatted_address },
  } = props
  return (
    <>
      <S.RowTitle>{name}</S.RowTitle>
      <S.RowBody>{formatted_address}</S.RowBody>
    </>
  )
}

export default Row
