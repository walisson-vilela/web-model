import Bullet from '../../../components/Bullet'
import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../utils/Formatters'
import { isObject } from '../../../utils/Validators'

import * as Modals from './Modals'
import { BodyInterface, Planogram } from './interfaces'
import { status as statusLabels } from './labels'
import * as S from './styled'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
export const parser = (
  data: unknown[],
  setModal: Function,
): BodyInterface[] => {
  const parsed = data.reduce<BodyInterface[]>((parse, e) => {
    if (!isObject(e)) return parse

    const id = numberOrDefault(e.id)
    if (!id) return parse

    const category: BodyInterface = {
      id,
      active: booleanOrDefault(e.active, false),

      active_jsx: (
        <Bullet
          content={e.status_label}
          color={statusLabels[e.status ? 1 : 0].color}
        />
      ),
      name: notEmptyStringOrDefault(e.name, ''),
      classification_label: notEmptyStringOrDefault(e.classification_label, ''),
      contractor_id: notEmptyStringOrDefault(e.contractor_id, ''),
      has_product: numberOrDefault(e.has_product),
      leaf_count: numberOrDefault(e.leaf_count),
      level: numberOrDefault(e.level, 0),
      level_label: notEmptyStringOrDefault(e.level_label, ''),
      lft: numberOrDefault(e.lft, 0),
      parent_id: numberOrDefault(e.parent_id),
      parent_label: notEmptyStringOrDefault(e.parent_label),
      planograms: (Array.isArray(e.planograms) ? e.planograms : []).reduce<
        Planogram[]
      >((parse, data) => {
        if (!isObject(data)) return parse
        const id = numberOrDefault(data.id)
        if (!id) return parse

        const file = data.file
        if (!isObject(file)) return parse

        const planogram: Planogram = {
          id,
          title: notEmptyStringOrDefault(data.title, ''),
          comment: notEmptyStringOrDefault(data.comment, ''),
          file: {
            url: notEmptyStringOrDefault(file.url, ''),
            name: notEmptyStringOrDefault(file.name, ''),
          },
        }

        return [...parse, planogram]
      }, [] as Planogram[]),
      product_count: numberOrDefault(e.product_count, 0),
      product_count_jsx: null,
      rght: numberOrDefault(e.rght),
      root_label: notEmptyStringOrDefault(e.root_label, ''),
      status: booleanOrDefault(e.status, false),
      status_label: notEmptyStringOrDefault(e.status_label, ''),
    }

    if (category.product_count > 0) {
      category.product_count_jsx = (
        <S.Link
          onClick={() => {
            setModal(
              <Modals.AssociatedProducts
                id={category.id}
                name={category.name}
                {...(
                  [
                    {
                      filter: 'category_id',
                      label: 'Categoria',
                    },
                    {
                      filter: 'subcategory_id',
                      label: 'Subategoria',
                    },
                    {
                      filter: 'product_line_id',
                      label: 'Linha de Produto',
                    },
                  ] as const
                )[category.level]}
                onClose={() => setModal(null)}
              />,
            )
          }}
        >
          {category.product_count.toString().padStart(2, '0')}
        </S.Link>
      )
    }

    return [...parse, category]
  }, [])
  return parsed
}
