import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Nome',
    key: 'name',
    textAlign: 'left',
    width: 3,
    sortKey: 'name',
  },
  {
    content: 'Função',
    key: 'role',
    textAlign: 'left',
    width: 2,
    sortKey: 'role',
  },
  {
    content: 'Status',
    key: 'status',
    textAlign: 'left',
    width: 2,
    sortKey: 'status',
  },
  {
    content: 'Supervisor',
    key: 'supervisor',
    textAlign: 'left',
    width: 3,
    sortKey: 'supervisor',
  },
  {
    content: 'Última Notificação',
    key: 'last_notification',
    textAlign: 'left',
    width: 3,
    sortKey: 'last_notification',
  },
  {
    content: 'Classificação',
    key: 'classification',
    textAlign: 'left',
    width: 3,
    sortKey: 'classification',
  },
  {
    content: 'Observação',
    key: 'observation',
    textAlign: 'left',
    width: 4,
    sortKey: 'observation',
  },
]

export default header
