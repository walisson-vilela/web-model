import { FiltersInterfaces } from '@mw-kit/mw-manager'
import { keys } from 'lodash'

import Bullet from '../../../../components/Bullet'

const STATUS: {
  [K in 0 | 1]: {
    color: 'red' | 'lightGreen'
    label: 'Ativo' | 'Inativo'
    value: K
  }
} = {
  0: { color: 'red', label: 'Inativo', value: 0 },
  1: { color: 'lightGreen', label: 'Ativo', value: 1 },
}

export const status: FiltersInterfaces.Filter = {
  label: 'Status',
  name: 'active',
  options: keys(STATUS).map((key) => {
    const { label, color } = STATUS[key === '1' ? 1 : 0]

    const option: FiltersInterfaces.Option = {
      label: <Bullet content={label} color={color} />,
      value: key,
    }

    return option
  }),
}

const filters: FiltersInterfaces.Filter[] = [
  status,
  {
    label: 'Tipo',
    name: 'electronic_point',
    options: [
      {
        label: 'Horário de Acesso',
        value: 0,
      },
      {
        label: 'Ponto Eletrônico',
        value: 1,
      },
    ],
  },
]

export default filters
