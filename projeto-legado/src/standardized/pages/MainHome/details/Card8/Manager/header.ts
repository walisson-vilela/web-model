import type { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Status',
    key: 'status',
    textAlign: 'left',
    width: 2,
    sortKey: 'status',
  },
  {
    content: 'Nome',
    key: 'name',
    textAlign: 'left',
    width: 3,
    sortKey: 'name',
  },
  {
    content: 'Supervisor',
    key: 'supervisor',
    textAlign: 'left',
    width: 3,
    sortKey: 'supervisor',
  },
  {
    content: 'Nome do roteiro',
    key: 'route_name',
    textAlign: 'left',
    width: 4,
    sortKey: 'route_name',
  },
  {
    content: 'N° Deslocamento',
    key: 'displacements',
    textAlign: 'center',
    width: 2,
    sortKey: 'displacements',
  },
  {
    content: 'Distância Real',
    key: 'real_distance',
    textAlign: 'center',
    width: 2,
    sortKey: 'real_distance',
  },
  {
    content: 'Tempo Real (Σ)',
    key: 'real_time',
    textAlign: 'center',
    width: 2,
    sortKey: 'real_time',
  },
  {
    content: 'Vel. Média. Ideal',
    key: 'ideal_speed',
    textAlign: 'center',
    width: 2,
    sortKey: 'ideal_speed',
  },
  {
    content: 'Vel. Média. Real',
    key: 'real_speed',
    textAlign: 'center',
    width: 2,
    sortKey: 'real_speed',
  },
]

export default header
