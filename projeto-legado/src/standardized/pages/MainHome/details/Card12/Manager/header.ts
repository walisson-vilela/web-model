import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  { content: 'Impacto', key: 'impact', textAlign: 'left', width: 2, sortKey: 'impact' },
  { content: 'Nome do roteiro', key: 'route_name', textAlign: 'left', width: 4, sortKey: 'route_name' },
  { content: 'Supervisor', key: 'supervisor', textAlign: 'left', width: 3, sortKey: 'supervisor' },
  { content: 'Executor', key: 'executor', textAlign: 'left', width: 3, sortKey: 'executor' },
  { content: 'D', key: 'd', textAlign: 'center', width: 1, sortKey: 'd' },
  { content: 'S', key: 's', textAlign: 'center', width: 1, sortKey: 's' },
  { content: 'T', key: 't', textAlign: 'center', width: 1, sortKey: 't' },
  { content: 'Q', key: 'q1', textAlign: 'center', width: 1, sortKey: 'q1' },
  { content: 'Q', key: 'q2', textAlign: 'center', width: 1, sortKey: 'q2' },
  { content: 'S', key: 's1', textAlign: 'center', width: 1, sortKey: 's1' },
  { content: 'S', key: 's2', textAlign: 'center', width: 1, sortKey: 's2' },
  { content: 'TMO + (S0)', key: 'tmo_plus', textAlign: 'center', width: 3, sortKey: 'tmo_plus' },
  { content: 'TMO - (S0)', key: 'tmo_minus', textAlign: 'center', width: 3, sortKey: 'tmo_minus' },
]

export default header
