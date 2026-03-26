import { FiltersInterfaces } from '@mw-kit/mw-manager'

import Bullet from '../../../components/Bullet'
import {
  brands as getBrandOptions,
  parentCategories as getParentOptions,
  subLevel as getSubLevel,
} from '../../../services/options'

import { status as statusLabels } from './labels'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Status',
    name: 'status',
    options: Object.keys(statusLabels)
      .reverse()
      .map((key) => {
        const { name, color } = statusLabels[key]

        const option: FiltersInterfaces.Option = {
          label: <Bullet content={name} color={color} />,
          value: key,
        }

        return option
      }),
  },

  {
    label: 'Marca',
    name: 'brand_id',
    options: getBrandOptions,
  },
  {
    label: 'Tipo de Produto',
    name: 'type',
    options: [
      { label: 'Próprio', value: 'OWN' },
      { label: 'Concorrente', value: 'COMPETITOR' },
    ],
  },

  {
    label: 'Categoria',
    name: 'category_id',
    options: getParentOptions,
  },

  {
    label: 'Subníveis',
    name: 'sublevel_id',
    options: getSubLevel,
  },
]

export default filters
