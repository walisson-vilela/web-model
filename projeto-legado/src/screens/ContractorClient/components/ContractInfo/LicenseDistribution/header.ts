import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'ID da Conta',
    key: 'id',
    textAlign: 'left',
    width: 3,
    sortKey: 'Contractors.account_id',
  },
  {
    content: 'Conta',
    key: 'nickname',
    textAlign: 'left',
    width: 4,
    sortKey: 'Contractors.nickname',
  },
  {
    content: 'Pilar',
    key: 'hierarchies',
    textAlign: 'left',
    width: 4,
    sortKey: 'Hierarchies.name',
  },
  {
    content: 'Distribuída',
    key: 'reserved',
    textAlign: 'center',
    width: 3,
    sortKey: 'ContractorLicenseHierarchies.reserved',
  },
  {
    content: 'Utilizada',
    key: 'consumed',
    textAlign: 'center',
    width: 3,
    sortKey: 'ContractorLicenseHierarchies.consumed',
  },
  {
    content: '% Consumo',
    key: 'consumed_percent',
    textAlign: 'center',
    width: 3,
    sortKey: 'ContractorLicenseHierarchies.consumed_percent',
  },
]

export default header
