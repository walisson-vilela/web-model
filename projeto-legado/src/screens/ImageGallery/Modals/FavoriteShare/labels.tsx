import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../utils/Formatters'

import { getPeople } from './services'

export const users = async (search, page, list) => {
  const { pagination, data } = await getPeople(search, page)
  const lastPage = !pagination.has_next_page
  const results =
    data.map((e) => {
      return {
        label: `${numberOrDefault(e.id)} - ${notEmptyStringOrDefault(e.name)}`,
        value: `${numberOrDefault(e.id)} - ${notEmptyStringOrDefault(e.name)}`,
        disabled: list.map((e) => e.people_id).includes(e.id),
        disabledText: 'Já existe um compartilhamento para este usuário.',
      }
    }) || []

  return {
    options: results,
    lastPage,
  }
}

export const shareTypesOptions = [
  { label: 'Gerenciar imagens', value: 'manager', data: {} },
  { label: 'Visualizar', value: 'viewer', data: {} },
  { label: 'Aprovar/Reprovar', value: 'liker', data: {} },
]

export const shareTypes = async () => {
  return { options: shareTypesOptions, lastPage: true }
}
