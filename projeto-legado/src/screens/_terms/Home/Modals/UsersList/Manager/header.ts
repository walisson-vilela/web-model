import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Id',
    key: 'id',
    textAlign: 'left',
    width: 2,
    sortKey: 'id',
  },
  {
    content: 'Usuário',
    key: 'user_name_jsx',
    textAlign: 'left',
    width: 3,
    sortKey: 'title',
  },
  {
    content: 'Função',
    key: 'role',
    textAlign: 'left',
    width: 3,
    sortKey: 'Account.name',
  },
  {
    content: 'Periódo de Aceite',
    key: 'created_at',
    textAlign: 'left',
    width: 3,
    sortKey: 'status',
  },
  {
    content: 'Ação',
    key: 'accepted',
    textAlign: 'left',
    width: 3,
    sortKey: 'accepted_count',
  },

  {
    content: 'Via',
    key: 'access',
    textAlign: 'left',
    width: 2,
    sortKey: 'access',
  },
  {
    content: 'Download',
    key: 'download_jsx',
    textAlign: 'left',
    width: 2,
    sortKey: '',
  },
]

export default header
