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
    textAlign: 'center',
    width: 2,
    sortKey: 'id',
  },
  {
    content: 'Pessoa',
    key: 'name',
    textAlign: 'left',
    width: 4,
    sortKey: 'name',
  },
  {
    content: 'Matrícula',
    key: 'registration',
    textAlign: 'left',
    width: 3,
    sortKey: 'registration',
  },
  {
    content: 'Setor de Trabalho',
    key: 'sector',
    textAlign: 'center',
    width: 3,
    sortKey: 'sector',
  },
  {
    content: 'Admissão',
    key: 'admission_formatted',
    textAlign: 'center',
    width: 2,
    sortKey: 'admission',
  },
]

export default header
