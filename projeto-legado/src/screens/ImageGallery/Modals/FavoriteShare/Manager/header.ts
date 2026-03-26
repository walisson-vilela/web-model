import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Matrícula',
    key: 'people_id',
    textAlign: 'left',
    width: 2,
    sortKey: 'people_id',
  },
  {
    content: 'Usuários',
    key: 'people_name',
    textAlign: 'left',
    width: 4,
    sortKey: 'people_name',
  },
  {
    content: 'Tipo de Compartilhamento',
    key: 'role_jsx',
    textAlign: 'left',
    width: 10,
    sortKey: 'role',
  },
]

export default header
