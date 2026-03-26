import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'ID',
    key: 'id',
    textAlign: 'left',
    width: 1,
    sortKey: 'id',
  },
  {
    content: 'Status',
    key: 'status_label',
    textAlign: 'left',
    width: 2,
    sortKey: 'status',
  },
  {
    content: 'Eventos',
    key: 'event_count',
    textAlign: 'center',
    width: 1,
    sortKey: 'event_count',
  },
  {
    content: 'Nome',
    key: 'name',
    textAlign: 'left',
    width: 3,
    sortKey: 'name',
  },
  {
    content: 'Matrícula',
    key: 'registration',
    textAlign: 'left',
    width: 1,
    sortKey: 'registration',
  },
  {
    content: 'Log-In',
    key: 'username',
    textAlign: 'center',
    width: 2,
    sortKey: 'username',
  },
  {
    content: 'Função',
    key: 'role_name',
    textAlign: 'left',
    width: 3,
    sortKey: 'Roles.name',
  },
  {
    content: 'Conta/Grupo',
    key: 'route_contractor_name',
    textAlign: 'left',
    width: 3,
    sortKey: 'RouteContractors.nickname',
  },
]

export default header
