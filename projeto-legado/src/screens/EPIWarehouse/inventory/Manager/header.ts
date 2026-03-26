import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Status',
    key: 'active_jsx',
    textAlign: 'left',
    width: 2,
    sortKey: 'active_jsx',
  },
  {
    content: "EPI's",
    key: 'size',
    textAlign: 'left',
    width: 4,
    sortKey: 'size',
  },
  {
    content: 'Período de Reposição',
    key: 'epi_expiration_months',
    textAlign: 'center',
    width: 4,
    sortKey: 'epi_expiration_months',
  },
  {
    content: 'Estoque Mínimo',
    key: 'inventory_min',
    textAlign: 'center',
    width: 3,
    sortKey: 'inventory_min',
  },
  {
    content: 'Em estoque',
    key: 'inventory_count',
    textAlign: 'center',
    width: 3,
    sortKey: 'inventory_count',
  },
  {
    content: 'Baixado Manualmente',
    key: 'inventory_manual_decrease',
    textAlign: 'center',
    width: 4,
    sortKey: 'inventory_manual_decrease',
  },

]

export default header
