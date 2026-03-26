import { ColumnInterface } from '@mw-kit/mw-manager'

const firstTabHeader: ColumnInterface[] = [
  {
    content: 'Id',
    key: 'id',
    textAlign: 'left',
    width: 2,
    sortKey: 'id',
  },
  {
    content: 'Documento',
    key: 'title',
    textAlign: 'left',
    width: 3,
    sortKey: 'title',
  },
  {
    content: 'Conta',
    key: 'account_name',
    textAlign: 'left',
    width: 3,
    sortKey: 'Account.name',
  },
  {
    content: 'Publicação',
    key: 'created_at',
    textAlign: 'left',
    width: 3,
    sortKey: 'status',
  },
  {
    content: 'Alcance',
    key: 'accepted_count',
    textAlign: 'left',
    width: 3,
    sortKey: 'accepted_count',
  },

  {
    content: 'Alcance %',
    key: 'percentage',
    textAlign: 'left',
    width: 2,
    sortKey: 'any',
  },
]

const secondTabHeader: ColumnInterface[] = [
  {
    content: 'Id',
    key: 'id',
    textAlign: 'left',
    width: 2,
    sortKey: 'id',
  },
  {
    content: 'Documento',
    key: 'title',
    textAlign: 'left',
    width: 3,
    sortKey: 'title',
  },
  {
    content: 'Conta',
    key: 'account_name',
    textAlign: 'left',
    width: 3,
    sortKey: 'Account.name',
  },
  {
    content: 'Período de Vigencia',
    key: 'validity_at',
    textAlign: 'left',
    width: 3,
    sortKey: 'created_at',
  },

  {
    content: 'Alcance',
    key: 'accepted_count',
    textAlign: 'left',
    width: 3,
    sortKey: 'accepted_count',
  },

  {
    content: 'Alcance %',
    key: 'percentage',
    textAlign: 'left',
    width: 2,
    sortKey: 'any',
  },
]

export function selectHeaderById(tabId: number): ColumnInterface[] {
  return tabId === 0 ? secondTabHeader : firstTabHeader
}
