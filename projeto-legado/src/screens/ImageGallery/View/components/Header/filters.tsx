import { FiltersInterfaces } from '@mw-kit/mw-manager'

import Bullet from '../../../../../components/Bullet'
import { productsOptions, subLevel } from '../../../../../services/options'

import {
  filterBrands,
  filterCategories,
  filterFavorites,
} from './filterServices'
import { status as statusLabels } from './labels'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Status da Foto',
    name: 'status',
    options: Object.keys(statusLabels).map((key) => {
      const { name, color, value } = statusLabels[key]
      const option: FiltersInterfaces.Option = {
        label: <Bullet content={name} color={color} />,
        value,
      }
      return option
    }),
  },

  {
    label: 'Posição da Foto',
    name: 'attendance_out_radius',
    options: [
      { label: 'Dentro do Raio', value: 0 },
      { label: 'Fora do Raio', value: 1 },
    ],
  },

  {
    label: 'Favoritos',
    name: 'file_favorite_id',
    options: filterFavorites,
  },
  {
    label: 'Marcas',
    name: 'brand_id',
    options: filterBrands,
  },

  {
    label: 'Categoria',
    name: 'category_id',
    options: filterCategories,
  },

  {
    label: 'Subníveis',
    name: 'sublevel_id',
    options: subLevel,
  },
  {
    label: 'Produto',
    name: 'product_id',
    options: productsOptions,
  },
]

export default filters
