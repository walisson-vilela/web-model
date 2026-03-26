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
    key: 'status_label',
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
    content: '1° Bateria do Dia',
    key: 'first_battery_day',
    textAlign: 'left',
    width: 3,
    sortKey: 'first_battery_day',
  },
  {
    content: 'Leitura Atual',
    key: 'current_reading',
    textAlign: 'left',
    width: 3,
    sortKey: 'current_reading',
  },
  {
    content: '% Médio Consumo',
    key: 'avg_consumption',
    textAlign: 'left',
    width: 3,
    sortKey: 'avg_consumption',
  },
  {
    content: 'Atividade Sistêmica',
    key: 'system_activity_label',
    textAlign: 'left',
    width: 3,
    sortKey: 'system_activity',
  },
]

export default header
