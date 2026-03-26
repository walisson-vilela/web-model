import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Código',
    key: 'favorite_id',
    textAlign: 'left',
    width: 1,
    sortKey: 'id',
  },
  {
    content: 'Meus Favoritos',
    key: 'favorite_name_jsx',
    textAlign: 'left',
    width: 4,
    sortKey: 'name',
  },
  {
    content: 'Criado por',
    key: 'people_name',
    textAlign: 'left',
    width: 3,
    sortKey: 'Peoples.name',
  },
  {
    content: 'Compartilhado',
    key: 'share_type_label',
    textAlign: 'left',
    width: 2,
    sortKey: 'shared',
  },
  {
    content: 'Imagens',
    key: 'image_count',
    textAlign: 'center',
    width: 2,
    sortKey: 'file_item_count',
  },
  {
    content: 'Aprovadas',
    key: 'approved_image_count',
    textAlign: 'center',
    width: 2,
    sortKey: 'approved',
  },
  {
    content: 'Reprovadas',
    key: 'disapproved_image_count',
    textAlign: 'center',
    width: 2,
    sortKey: 'disapproved',
  },
]

export default header
