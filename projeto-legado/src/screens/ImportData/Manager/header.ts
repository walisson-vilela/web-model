import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'ID',
    key: 'id',
    textAlign: 'left',
    width: 1,
    sortKey: 'FileImports.id',
  },
  {
    content: 'Nome',
    key: 'name',
    textAlign: 'left',
    width: 5,
    sortKey: 'Peoples.name',
  },
  {
    content: 'Data da Importação',
    key: 'import_date',
    textAlign: 'left',
    width: 2,
    sortKey: 'FileImports.created_at',
  },
  {
    content: 'Data Programada',
    key: 'scheduled_date',
    textAlign: 'left',
    width: 2,
    sortKey: 'FileImports.notbefore',
  },
  {
    content: 'Data do Processamento',
    key: 'processed_date',
    textAlign: 'left',
    width: 2,
    sortKey: 'FileImports.fetched',
  },
  {
    content: 'Arquivo',
    key: 'files',
    textAlign: 'left',
    width: 2,
    sortKey: 'Files.id',
  },
  {
    content: 'Situação',
    key: 'status',
    textAlign: 'left',
    width: 2,
    sortKey: 'FileImports.status',
  },
]

export default header
