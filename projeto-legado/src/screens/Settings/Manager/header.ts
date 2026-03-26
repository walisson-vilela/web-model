import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'ID',
    key: 'id',
    textAlign: 'left',
    width: 1,
  },
  {
    content: 'Configurações',
    key: 'setting',
    textAlign: 'left',
    width: 8,
  },
  {
    content: 'Referência',
    key: 'reference',
    textAlign: 'left',
    width: 5,
  },
  {
    content: 'Ação',
    key: 'action',
    textAlign: 'center',
    width: 2,
  },
]

export default header
