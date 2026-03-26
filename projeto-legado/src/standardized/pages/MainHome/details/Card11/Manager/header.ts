import { ColumnInterface } from '@mw-kit/mw-manager'

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
    content: 'Atend. Previsto',
    key: 'planned_attendances',
    textAlign: 'center',
    width: 2,
    sortKey: 'planned_attendances',
  },
  {
    content: 'Atend. Adicionado',
    key: 'added_attendances',
    textAlign: 'center',
    width: 2,
    sortKey: 'added_attendances',
  },
  {
    content: 'Atend. Realizado',
    key: 'realized_attendances',
    textAlign: 'center',
    width: 2,
    sortKey: 'realized_attendances',
  },
  {
    content: 'Distância Prevista',
    key: 'planned_distance',
    textAlign: 'center',
    width: 2,
    sortKey: 'planned_distance',
  },
  {
    content: 'Distância Real',
    key: 'real_distance',
    textAlign: 'center',
    width: 2,
    sortKey: 'real_distance',
  },
]

export default header
