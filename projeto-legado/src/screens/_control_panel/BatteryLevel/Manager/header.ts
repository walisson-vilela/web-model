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
    width: 1,
    sortKey: 'role_name',
  },
  {
    content: 'Status',
    key: 'active_status_jsx',
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
    content: '1º Bateria do Dia',
    key: 'first_battery_day',
    textAlign: 'center',
    width: 2,
    sortKey: 'first_battery_day',
  },
  {
    content: 'Leitura Atual',
    key: 'last_battery_day',
    textAlign: 'center',
    width: 2,
    sortKey: 'last_battery_day',
  },
  {
    content: '% Médio Consumo',
    key: 'average_consumption_avg',
    textAlign: 'center',
    width: 2,
    sortKey: 'average_consumption_avg',
  },
  {
    content: 'Atividade Sistemica',
    key: 'activity_status_srt_jsx',
    textAlign: 'center',
    width: 2,
    sortKey: 'activity_status_srt',
  },
]

export default header
