import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Arquivo',
    key: 'name',
    textAlign: 'left',
    width: 6,
    sortKey: 'name',
  },
  {
    content: 'Origem',
    key: 'type_label',
    textAlign: 'left',
    width: 4,
    sortKey: 'type',
  },
  {
    content: 'Expira em',
    key: 'expire_date_txt',
    textAlign: 'center',
    width: 2,
    sortKey: 'expire_date',
  },
  {
    content: 'Tipo',
    key: 'extension_label',
    textAlign: 'center',
    width: 2,
    sortKey: 'extension',
  },
  {
    content: 'Tamanho',
    key: 'size_txt',
    textAlign: 'center',
    width: 2,
    sortKey: 'Files.size',
  },
  {
    content: 'Status',
    key: 'progress_jsx',
    textAlign: 'center',
    width: 2,
    sortKey: 'progress',
  },
]

export default header
