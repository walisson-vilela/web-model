import { MwEllipsisContainer } from '@mw-kit/mw-ui'
import { SelectOption } from '@mw-kit/mw-ui/types'

import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../../../../utils/Validators'
import { ParserFunction } from '../../../../../../../../../utils/hooks/useSelectLoader/interfaces'

import * as S from './styled'

type Category = {
  name: string
  level_label: string
  parent_label: string
  product_count: number
}

export const parseFunction: ParserFunction<Category> = (data) => {
  const parse = data.reduce((parse, e) => {
    if (!isObject(e)) return parse

    const id = numberOrDefault(e.id)
    if (!id) return parse

    const rowItem: SelectOption<Category> = {
      value: id.toString(),

      rules: [
        (index, data) => {
          return data.product_count === 0
            ? true
            : {
                position: 'right center',
                content:
                  'Você não pode selecionar o subnível por que ele possuí produto associado, para a seleção desvincule os produtos.',
              }
        },
      ],
      label: ({ data: { name, level_label, parent_label }, mode }) => (
        <S.Label>
          <div>
            <MwEllipsisContainer>{name}</MwEllipsisContainer>
            {mode !== 'placeholder' && (
              <MwEllipsisContainer>{parent_label}</MwEllipsisContainer>
            )}
          </div>
          <div>{level_label}</div>
        </S.Label>
      ),

      data: {
        name: notEmptyStringOrDefault(e.name, ''),

        level_label: notEmptyStringOrDefault(e.level_label, ''),

        parent_label: notEmptyStringOrDefault(e.parent_label, ''),
        product_count: numberOrDefault(e.product_count, 0),
      },
    }
    return [...parse, rowItem]
  }, [])
  return parse
}
