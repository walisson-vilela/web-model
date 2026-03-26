import { FiltersInterfaces } from '@mw-kit/mw-manager'

import Bullet from '../../../../components/Bullet'
import { keys } from '../../../../utils/Formatters'

import { status as statusLabels, types } from './labels'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Status',
    name: 'status',
    options: Object.keys(statusLabels).map((key) => {
      const { name, color } = statusLabels[key]

      const option: FiltersInterfaces.Option = {
        label: <Bullet content={name} color={color} />,
        value: key,
      }

      return option
    }),
  },
  {
    label: 'Tipo',
    name: 'default',
    options: keys(types).map((type) => {
      const { label, value } = types[type]
      return { label, value }
    }),
  },
  {
    label: 'Nível de Acesso',
    name: 'access_level_id',
    options: [
      { label: 'Relatório', value: 3 },
      { label: 'Básico', value: 1 },
      { label: 'Completo', value: 2 },
    ],
  },
  {
    label: 'Atributos Internos',
    name: 'internal_access',
    options: [
      { label: 'Sim', value: 1 },
      { label: 'Não', value: 0 },
    ],
  },
]

export default filters
