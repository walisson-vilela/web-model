import type { ColumnInterface } from '@mw-kit/mw-manager'

const createHeader = (checkLabel: string): ColumnInterface[] => [
  {
    content: 'Ponto de atendimento',
    key: 'pdv',
    textAlign: 'left',
    width: 3,
    sortKey: 'pdv',
  },
  {
    content: 'Nome do roteiro',
    key: 'route_name',
    textAlign: 'center',
    width: 2,
    sortKey: 'route_name',
  },
  {
    content: 'Origem',
    key: 'origin',
    textAlign: 'center',
    width: 2,
    sortKey: 'origin',
  },
  {
    content: 'Executor',
    key: 'executor',
    textAlign: 'center',
    width: 2,
    sortKey: 'executor',
  },
  {
    content: checkLabel,
    key: 'check_time',
    textAlign: 'center',
    width: 2,
    sortKey: 'check_time',
  },
  {
    content: 'Registrado por',
    key: 'registered_by',
    textAlign: 'center',
    width: 2,
  },
  {
    content: 'Distância do PDV (m)',
    key: 'distance',
    textAlign: 'center',
    width: 2,
    sortKey: 'distance',
  },
]

export const checkInHeader = createHeader('Check-in')
export const checkOutHeader = createHeader('Check-out')
