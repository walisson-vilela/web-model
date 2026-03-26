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
    content: 'Hierarquia',
    key: 'hierarchy',
    textAlign: 'left',
    width: 3,
    sortKey: 'hierarchy',
  },
  {
    content: 'Tipo Conexão',
    key: 'connection_type',
    textAlign: 'left',
    width: 2,
    sortKey: 'connection_type',
  },
  {
    content: 'Data Notificação',
    key: 'notification_date',
    textAlign: 'left',
    width: 3,
    sortKey: 'notification_date',
  },
  {
    content: 'Imagens',
    key: 'images',
    textAlign: 'center',
    width: 2,
    sortKey: 'images',
  },
  {
    content: 'Dados',
    key: 'data',
    textAlign: 'center',
    width: 2,
    sortKey: 'data',
  },
  {
    content: 'Nível Conexão',
    key: 'connection_level',
    textAlign: 'center',
    width: 3,
    sortKey: 'connection_level',
  },
]

export default header
