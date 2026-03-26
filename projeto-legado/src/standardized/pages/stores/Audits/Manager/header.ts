import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'ID',
    key: 'store_id',
    textAlign: 'left',
    width: 1,
  },
  {
    content: 'PDV',
    key: 'nickname_jsx',
    textAlign: 'left',
    width: 3,
  },
  {
    content: 'Bairro',
    key: 'sublocality_name',
    textAlign: 'left',
    width: 2,
  },
  {
    content: 'Cidade',
    key: 'city_name',
    textAlign: 'left',
    width: 2,
  },
  {
    content: 'Estado',
    key: 'state_code',
    textAlign: 'center',
    width: 1,
  },
  {
    content: 'Auditado por',
    key: 'created_by_jsx',
    textAlign: 'left',
    width: 3,
  },
  {
    content: 'Função',
    key: 'created_by_role_jsx',
    textAlign: 'left',
    width: 2,
  },
  {
    content: 'Data da Auditoria',
    key: 'created_at_jsx',
    textAlign: 'center',
    width: 2,
  },
]

export default header
