import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Código',
    key: 'store_id',
    textAlign: 'left',
    width: 1,
    sortKey: 'Stores.id',
  },
  {
    content: 'PDV',
    key: 'store_name_jsx',
    textAlign: 'left',
    width: 7,
    sortKey: 'Stores.name',
  },
  {
    content: 'Marcas',
    key: 'brand_count_jsx',
    textAlign: 'center',
    width: 2,
    sortKey: 'brand_count',
  },
  {
    content: 'Imagens',
    key: 'image_count',
    textAlign: 'center',
    width: 2,
    sortKey: 'image_count',
  },
  {
    content: 'Aprovadas',
    key: 'approved_image_count',
    textAlign: 'center',
    width: 2,
    sortKey: 'approved_image_count',
  },
  {
    content: 'Reprovadas',
    key: 'disapproved_image_count',
    textAlign: 'center',
    width: 2,
    sortKey: 'disapproved_image_count',
  },
]

export default header
