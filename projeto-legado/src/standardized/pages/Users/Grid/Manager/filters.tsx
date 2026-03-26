import { FiltersInterfaces } from '@mw-kit/mw-manager'

import Bullet from '../../../../../components/Bullet'
import {
  contractors,
  hierarchies,
  regions,
  roles,
} from '../../../../../services/options'
import { keys } from '../../../../../utils/Formatters'
import { PERSON_STATUS } from '../../labels'

export const status: FiltersInterfaces.Filter = {
  label: 'Status',
  name: 'status',
  options: keys(PERSON_STATUS).map((key) => {
    const { label, color } = PERSON_STATUS[key]

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
    label: 'Eventos',
    name: 'events',
    options: [
      {
        label: 'Sim',
        value: 1,
      },
      {
        label: 'Não',
        value: 0,
      },
    ],
  },

  {
    label: 'Função',
    name: 'role_id',
    options: roles,
  },

  {
    label: 'Atributos Internos',
    name: 'internal_access',
    options: [
      { label: 'Sim', value: 1 },
      { label: 'Não', value: 0 },
    ],
  },

  {
    label: 'Pilar',
    name: 'hierarchy_id',
    options: hierarchies,
  },

  {
    label: 'Área de Atuação',
    name: 'region_id',
    options: regions,
  },

  {
    label: 'Conta/Grupo',
    name: 'route_contractor_id',
    options: contractors,
  },
]

export default filters
