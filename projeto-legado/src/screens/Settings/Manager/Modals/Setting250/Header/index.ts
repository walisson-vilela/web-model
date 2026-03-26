import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'ID',
    key: 'id',
    textAlign: 'left',
    width: 3,
    sortKey: 'Peoples.id',
  },
  {
    content: 'Usuário',
    key: 'name',
    textAlign: 'left',
    width: 8,
    sortKey: 'Peoples.name',
  },
  {
    content: 'Função',
    key: 'role',
    textAlign: 'left',
    width: 5,
    sortKey: 'Roles.name',
  },
]

export default header
