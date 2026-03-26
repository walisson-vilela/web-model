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
    textAlign: 'center',
    width: 1,
    sortKey: 'role_name',
  },
  {
    content: 'Status',
    key: 'active_jsx',
    textAlign: 'left',
    width: 1,
    sortKey: 'active',
  },
  {
    content: 'Supervisor',
    key: 'supervisor_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'supervisor',
  },
  {
    content: 'Hierarquia',
    key: 'supervisor_hierarchy',
    textAlign: 'left',
    width: 2,
    sortKey: 'supervisor_hierarchy',
  },
  {
    content: 'Atendimento Iniciado',
    key: 'attendance_started',
    textAlign: 'center',
    width: 2,
    sortKey: 'attendance_started',
  },
  {
    content: 'Ultima Conexão',
    key: 'last_connection',
    textAlign: 'center',
    width: 2,
    sortKey: 'last_connection',
  },
  {
    content: 'Desconectado',
    key: 'disconnected_time',
    textAlign: 'center',
    width: 2,
    sortKey: 'disconnected_time',
  },
  {
    content: 'Classificação',
    key: 'classification',
    textAlign: 'center',
    width: 2,
    sortKey: 'classification',
  },
]

export default header
