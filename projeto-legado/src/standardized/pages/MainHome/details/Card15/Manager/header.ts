import type { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'ID',
    key: 'id',
    textAlign: 'left',
    width: 1,
    sortKey: 'id',
  },
  {
    content: 'Nome do PDV',
    key: 'pdv_name',
    textAlign: 'left',
    width: 4,
    sortKey: 'pdv_name',
  },
  {
    content: 'Grupo',
    key: 'group',
    textAlign: 'left',
    width: 2,
    sortKey: 'group',
  },
  {
    content: 'Rede',
    key: 'network',
    textAlign: 'left',
    width: 2,
    sortKey: 'network',
  },
  {
    content: 'Bandeira',
    key: 'flag',
    textAlign: 'left',
    width: 2,
    sortKey: 'flag',
  },
  {
    content: 'Ciclo',
    key: 'cycle',
    textAlign: 'center',
    width: 1,
    sortKey: 'cycle',
  },
  {
    content: 'Período',
    key: 'period',
    textAlign: 'center',
    width: 2,
    sortKey: 'period',
  },
  {
    content: 'Nota Loja Modelo',
    key: 'model_store_score',
    textAlign: 'center',
    width: 1,
    sortKey: 'model_store_score',
  },
]

export default header
