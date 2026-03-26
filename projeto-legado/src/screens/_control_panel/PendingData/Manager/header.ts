import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Nome',
    key: 'people_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'people_name',
  },
  {
    content: 'Função',
    key: 'role_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'role_name',
  },
  {
    content: 'Status',
    key: 'active_status',
    textAlign: 'left',
    width: 1,
    sortKey: 'active_status',
  },
  {
    content: 'Supervisor',
    key: 'supervisor_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'supervisor_name',
  },
  {
    content: 'Hierarquia',
    key: 'supervisor_hierarchy',
    textAlign: 'left',
    width: 2,
    sortKey: 'supervisor_hierarchy',
  },
  {
    content: 'Tipo de Conexão',
    key: 'connection_type',
    textAlign: 'center',
    width: 2,
    sortKey: 'connection_type',
  },
  {
    content: 'Data Notificação',
    key: 'notification_date',
    textAlign: 'left',
    width: 2,
    sortKey: 'notification_date',
  },
  {
    content: 'Imagens',
    key: 'images_count',
    textAlign: 'center',
    width: 1,
    sortKey: 'images_count',
  },
  {
    content: 'Dados',
    key: 'data_count',
    textAlign: 'center',
    width: 1,
    sortKey: 'data_count',
  },
  {
    content: 'Nível Conexão',
    key: 'connection_level_status',
    textAlign: 'center',
    width: 2,
    sortKey: 'connection_level_status',
  },
]

export default header
