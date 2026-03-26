import { FiltersProps } from '@mw-kit/mw-ui/dist/components/Filters/Filters/interfaces'

import {
  categories,
  productLine,
  subCategories,
} from '../../../../../../../services/options'

const filters: Omit<FiltersProps, 'setAppliedFilters'> = {
  items: [
    {
      label: 'Categoria',
      name: 'category_id',
      options: async (value, page) => {
        return await categories(value, page, 'mw-ui')
      },
      allowEmptySearch: true,
    },
    {
      label: 'Subategoria',
      name: 'subcategory_id',
      options: async (value, page) => {
        return await subCategories(value, page, 'mw-ui')
      },
      allowEmptySearch: true,
    },
    {
      label: 'Linha de Produto',
      name: 'product_line_id',
      options: async (value, page) => {
        return await productLine(value, page, 'mw-ui')
      },
      allowEmptySearch: true,
    },
  ],
}

export default filters
