import { FiltersInterfaces } from '@mw-kit/mw-manager'

import Bullet from '../../../components/Bullet'
import { accountCountries, regions } from '../../../services/options'

import { status } from './labels'

const filters = (hierarchy_id: number): FiltersInterfaces.Filter[] => [
  {
    label: 'Status',
    name: 'active',
    options: Object.keys(status)
      .reverse()
      .map((key) => {
        const { name, color } = status[key]

        const option: FiltersInterfaces.Option = {
          label: <Bullet content={name} color={color} />,
          value: key,
        }

        return option
      }),
  },
  {
    label: 'Área de Atuação',
    name: 'region_id',
    options: async (value, page) => {
      return await regions(value, page, 'mw-manager', hierarchy_id)
    },
  },
  {
    label: 'País',
    name: 'country_id',
    options: accountCountries,
  },
]

export default filters
