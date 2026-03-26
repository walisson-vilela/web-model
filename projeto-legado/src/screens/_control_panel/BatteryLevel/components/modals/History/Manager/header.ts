import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Intervalo',
    key: 'mobile_date',
    textAlign: 'center',
    width: 3,
  },
  {
    content: 'Nível Atividade',
    key: 'activity_status',
    textAlign: 'center',
    width: 5,
  },
  {
    content: '% de Carga',
    key: 'battery_level',
    textAlign: 'center',
    width: 4,
  },
  {
    content: 'Média Consumo Bateria',
    key: 'battery_consumption',
    textAlign: 'center',
    width: 4,
  },
]

export default header
