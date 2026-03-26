import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Status',
    key: 'status_label',
    textAlign: 'left',
    width: 2,
    sortKey: 'status',
  },
  {
    content: 'ID',
    key: 'id',
    textAlign: 'left',
    width: 1,
    sortKey: 'id',
  },
  {
    content: 'Função',
    key: 'name',
    textAlign: 'left',
    width: 2,
    sortKey: 'name',
  },
  {
    content: 'Tipo',
    key: 'default_label',
    textAlign: 'left',
    width: 2,
    sortKey: 'default_id',
  },
  {
    content: 'Nível de Acesso',
    key: 'access_level_label',
    textAlign: 'center',
    width: 2,
    sortKey: 'access_level_id',
  },
  {
    content: 'Atributos Internos',
    key: 'internal_access_label',
    textAlign: 'center',
    width: 3,
    sortKey: 'internal_access',
  },
  {
    content: 'Representatividade',
    key: 'user_percentage',
    textAlign: 'center',
    width: 3,
    sortKey: 'user_count',
  },
  {
    content: 'Usuários Associados',
    key: 'user_count',
    textAlign: 'center',
    width: 3,
    sortKey: 'user_count',
  },
]

export default header
