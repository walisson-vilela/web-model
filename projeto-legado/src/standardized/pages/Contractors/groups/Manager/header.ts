import { ColumnInterface } from '@mw-kit/mw-manager'

export const header: ColumnInterface[] = [
  {
    content: 'Status',
    key: 'active_jsx',
    width: 2,
    sortKey: 'status',
  },
  {
    content: 'Matrícula',
    key: 'id',
    width: 2,
    textAlign: 'center',
    sortKey: 'id',
  },
  {
    content: 'Agrupamento',
    key: 'name',
    width: 6,
    sortKey: 'nickname',
  },
  {
    content: 'Conta',
    key: 'contractors_subcontractors_count',
    width: 3,
    textAlign: 'center',
    sortKey: 'contractors_subcontractors_count',
  },
  {
    content: 'Responsáveis',
    key: 'contractor_peoples_count',
    width: 3,
    textAlign: 'center',
    sortKey: 'contractor_people_count',
  },
]
