import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Usuário',
    key: 'name_jsx',
    textAlign: 'left',
    width: 4,
    sortKey: 'name',
  },
  {
    content: 'Função',
    key: 'role_name',
    textAlign: 'left',
    width: 3,
    sortKey: 'Roles.name',
  },
  {
    content: 'Motivo de Inativação',
    key: 'inactivation_reason_name',
    textAlign: 'center',
    width: 3,
    sortKey: 'Classifications.name',
  },
  {
    content: 'Supervisão',
    key: 'supervisor_name',
    textAlign: 'left',
    width: 3,
    sortKey: 'Superiors.name',
  },
  {
    content: 'Roteiro',
    key: 'route_names',
    textAlign: 'left',
    width: 3,
    sortKey: 'route_names',
  },
]

export default header
