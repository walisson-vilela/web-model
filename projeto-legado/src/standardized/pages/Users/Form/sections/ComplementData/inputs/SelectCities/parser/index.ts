import { SelectOption } from '@mw-kit/mw-ui/types'

import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../../../../utils/Validators'
import { ParserFunction } from '../../../../../../../../../utils/hooks/useSelectLoader/interfaces'
import { HostCity } from '../types'

import Label from './label'

const parser: ParserFunction = (data) => {
  const dados = data.reduce((parsed, e) => {
    if (!isObject(e) || !isObject(e.country) || !isObject(e.state)) {
      return parsed
    }

    const data: HostCity = {
      id: numberOrDefault(e.id, 0),
      name: notEmptyStringOrDefault(e.name, ''),

      state: {
        id: numberOrDefault(e.state.id, 0),
        name: notEmptyStringOrDefault(e.state.name, ''),
      },

      country: {
        id: numberOrDefault(e.country.id, 0),
        name: notEmptyStringOrDefault(e.country.name, ''),
      },
    }

    const option: SelectOption<HostCity> = {
      value: data.id.toString(),
      label: Label,
      data,
      rules: [],
    }

    return [...parsed, option]
  }, [])

  return dados
}

export default parser
