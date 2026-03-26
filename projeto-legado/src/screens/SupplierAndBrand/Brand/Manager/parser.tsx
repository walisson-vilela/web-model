import Bullet from '../../../../components/Bullet'
import { ModalState } from '../../../../components/MwModal'
import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../utils/Formatters'
import { isObject } from '../../../../utils/Validators'
import { SetState } from '../../../interfaces'
import AssociatedProducts from '../../AssociatedProducts'

import { BodyInterface } from './interface'
import { status as statusLabels } from './label'
import * as S from './styles'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (
  data: unknown[],
  setModal: SetState<ModalState | null>,
): BodyInterface[] => {
  const parsed = data.reduce<BodyInterface[]>((parse, data) => {
    if (!isObject(data)) return parse

    const id = numberOrDefault(data.id)
    if (!id) return parse

    const status = booleanOrDefault(data.status, false)

    const brand: BodyInterface = {
      id,
      status,
      status_jsx: (
        <Bullet
          content={statusLabels[status ? 1 : 0].name}
          color={statusLabels[status ? 1 : 0].color}
        />
      ),
      code: notEmptyStringOrDefault(data.code),
      name: notEmptyStringOrDefault(data.name, ''),
      supplier: null,
      type: notEmptyStringOrDefault(data.type, ''),

      product_count: numberOrDefault(data.product_count, 0),
      products_count_jsx: null,

      country_count: numberOrDefault(data.country_count, 0),
      country_count_jsx: null,

      type_label: notEmptyStringOrDefault(data.type_label),
    }

    if (isObject(data.supplier)) {
      const status = booleanOrDefault(data.supplier.status, false)

      brand.supplier = (
        <Bullet
          content={notEmptyStringOrDefault(data.supplier.name, '')}
          color={statusLabels[status ? 1 : 0].color}
        />
      )
    }

    if (brand.product_count > 0) {
      brand.products_count_jsx = (
        <S.Link
          onClick={() =>
            setModal(
              <AssociatedProducts
                filter='brand_id'
                id={brand.id}
                label='Marca'
                name={brand.name}
                onClose={() => setModal(null)}
              />,
            )
          }
          children={data.product_count.toString().padStart(2, '0')}
        />
      )
    }

    if (brand.country_count > 0) {
      brand.country_count_jsx = brand.country_count.toString().padStart(2, '0')
    }

    return [...parse, brand]
  }, [])
  return parsed
}

export default parser
