import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Nome',
    key: 'name_jsx',
    width: 3,
    sortKey: 'name',
  },
  {
    content: 'Vigência',
    key: 'validity',
    width: 2,
    sortKey: 'validity',
  },
  {
    content: 'Conta',
    key: 'account_name',
    width: 2,
    sortKey: 'account_name',
  },
  {
    content: 'Pilar',
    key: 'hierarchy_name',
    width: 2,
    sortKey: 'hierarchy_name',
  },
  {
    content: 'Enviados',
    key: 'delivered',
    width: 1,
    sortKey: 'delivered',
    textAlign: 'center',
  },
  {
    content: 'Formulários',
    key: 'has_forms',
    width: 1,
    sortKey: 'has_forms',
    textAlign: 'center',
  },
  {
    content: 'Local',
    key: 'has_regions',
    width: 1,
    sortKey: 'has_regions',
    textAlign: 'center',
  },
  {
    content: 'Canal',
    key: 'has_segments',
    width: 1,
    sortKey: 'has_segments',
    textAlign: 'center',
  },
  {
    content: 'PDV',
    key: 'has_stores',
    width: 1,
    sortKey: 'has_stores',
    textAlign: 'center',
  },
  {
    content: 'Produtos',
    key: 'has_products',
    width: 1,
    sortKey: 'has_products',
    textAlign: 'center',
  },
  {
    content: 'Usuário',
    key: 'has_peoples',
    width: 1,
    sortKey: 'has_peoples',
    textAlign: 'center',
  },
  {
    content: '',
    key: 'config',
    textAlign: 'center',
  },
]

export default header
