
import { BodyInterface } from '../../interfaces'

import { Form } from './interfaces'

export const getDefaultData = (data: BodyInterface | undefined): Form => {
  if (!data) {
    return {
      name: '',
      size_type: 'acronym',
      status: 'ativo',
      sizes: [],
    }
  }

  return {
    name: data.name || '',
    size_type: data.size || 'acronym',
    status: 'ativo',
    sizes: [],
  }
}
