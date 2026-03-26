import type { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Nome',
    key: 'name',
    textAlign: 'left',
    width: 6,
    sortKey: 'name',
  },
  {
    content: 'Matrícula',
    key: 'registration',
    textAlign: 'left',
    width: 4,
    sortKey: 'registration',
  },
  {
    content: 'Função',
    key: 'role',
    textAlign: 'left',
    width: 4,
    sortKey: 'Roles.name',
  },
  {
    content: 'Pilares',
    key: 'team',
    textAlign: 'center',
    width: 2,
    sortKey: 'hierarchy_count',
  },
]

export default header
