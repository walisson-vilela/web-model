import { MwEllipsisContainer } from '@mw-kit/mw-ui'
import { SelectOption } from '@mw-kit/mw-ui/types'

import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../../utils/Validators'
import { ParserFunction } from '../../../../../../../utils/hooks/useSelectLoader/interfaces'
import * as S from '../../styles'

type CategoryAndSublevel = {
  id: number
  name: string
  path_label: string
}

export const parseFunction: ParserFunction<CategoryAndSublevel> = (data) => {
  const parse = data.reduce((parse, e) => {
    if (!isObject(e)) return parse

    const id = numberOrDefault(e.id)
    if (!id) return parse

    const rowItem: SelectOption<CategoryAndSublevel> = {
      value: id.toString(),

      rules: [],
      label: ({ data: { name, path_label }, mode }) => (
        <S.Label>
          <div>
            <MwEllipsisContainer>{name}</MwEllipsisContainer>
            {mode !== 'placeholder' && (
              <MwEllipsisContainer>{path_label}</MwEllipsisContainer>
            )}
          </div>
        </S.Label>
      ),

      data: {
        id: numberOrDefault(e.id),
        name: notEmptyStringOrDefault(e.name, ''),

        path_label: notEmptyStringOrDefault(e.path_label, ''),
      },
    }
    return [...parse, rowItem]
  }, [])
  return parse
}
