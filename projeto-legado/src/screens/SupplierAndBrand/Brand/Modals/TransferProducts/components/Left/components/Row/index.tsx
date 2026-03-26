import { RowComponent } from '../../../../../../../../../components/GridSelector/interfaces'
import { Product } from '../../../../interfaces'

import * as S from './styled'

const Row: RowComponent<Product> = (props) => {
  const {
    data: { name, category_name, product_line_name },
  } = props
  return (
    <>
      <S.RowTitle>{name}</S.RowTitle>

      <S.RowBody>
        Categoria: {category_name} | Linha de Produto: {product_line_name}{' '}
      </S.RowBody>
    </>
  )
}

export default Row
