import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Status',
    key: 'active_jsx',
    textAlign: 'left',
    width: 2,
    sortKey: 'status',
  },
  {
    content: 'Categorias/Subníveis',
    key: 'name',
    textAlign: 'left',
    width: 3,
    sortKey: 'name',
  },

  {
    content: 'Classificação',
    key: 'classification_label',
    textAlign: 'center',
    width: 2,
    sortKey: 'level',
  },
  {
    content: 'Nível de Vinculação',
    key: 'level_label',
    textAlign: 'center',
    width: 2,
    sortKey: 'level',
  },
  {
    content: 'Associação de Vínculo',
    key: 'parent_label',
    textAlign: 'center',
    width: 5,
    sortKey: 'parent_label',
  },
  {
    content: 'Produto',
    key: 'product_count_jsx',
    textAlign: 'center',
    width: 3,
    sortKey: 'has_product',
  },
]

export default header
