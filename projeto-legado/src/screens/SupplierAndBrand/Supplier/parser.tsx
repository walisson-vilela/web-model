import Bullet from '../../../components/Bullet'
import Popup from '../../../standardized/components/Popup'
import { formatPercent } from '../../../standardized/utils/formatters/numbers'
import { isObject } from '../../../standardized/utils/validators'
import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../utils/Formatters'
import AssociatedProducts from '../AssociatedProducts'

import BrandPopup from './Popups/BrandList'
import { BodyInterface } from './interfaces'
import * as S from './styles'

const parser = (data: unknown[], setModal: Function): BodyInterface[] => {
  return data.reduce<BodyInterface[]>((parsed, item) => {
    if (!isObject(item)) return parsed

    const parsedItem: BodyInterface = {
      id: numberOrDefault(item.id),

      status: booleanOrDefault(item.status, false),

      status_jsx: (
        <Bullet
          content={!item.status ? 'Inativo' : 'Ativo'}
          color={!item.status ? '#ef5350' : '#66bb6a'}
        />
      ),
      code: notEmptyStringOrDefault(item.code),
      name: notEmptyStringOrDefault(item.name),
      brand_count: numberOrDefault(item.brand_count, 0),
      brands_count_jsx: null,
      brand_percentage: numberOrDefault(item.brand_percentage, 0),
      brand_percentage_jsx: null,
      product_count: numberOrDefault(item.product_count),
      product_count_jsx: null,
    }

    if (parsedItem.product_count > 0) {
      parsedItem.product_count_jsx = (
        <S.Link
          onClick={() => {
            setModal(
              <AssociatedProducts
                filter='supplier_id'
                id={parsedItem.id}
                label='Fabricante'
                name={parsedItem.name}
                onClose={() => setModal(null)}
              />,
            )
          }}
        >
          {parsedItem.product_count.toString().padStart(2, '0')}
        </S.Link>
      )
    }

    if (parsedItem.brand_count > 0) {
      parsedItem.brands_count_jsx = (
        <BrandPopup
          parsedItem={{
            id: parsedItem.id,
            name: parsedItem.name,
            brand_count: parsedItem.brand_count,
          }}
        />
      )
    }

    if (parsedItem.brand_percentage > 0) {
      parsedItem.brand_percentage_jsx = (
        <Popup
          position='left center'
          style={{ border: 'none' }}
          inverted
          content={
            <p>
              O Peso considera a qtd. de Marcas
              <br /> que tem o Fabricante do total.
            </p>
          }
          trigger={
            <div style={{ cursor: 'pointer', display: 'inline' }}>
              {formatPercent(parsedItem.brand_percentage)}
            </div>
          }
        />
      )
    }

    return [...parsed, parsedItem]
  }, [])
}

export default parser
