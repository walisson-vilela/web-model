import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Id',
    key: 'id',
    textAlign: 'left',
    width: 2,
    sortKey: 'ExportProcesses.id',
  },

  {
    content: 'Nome',
    key: 'name',
    textAlign: 'left',
    width: 4,
    sortKey: 'Peoples.name',
  },

  {
    content: 'Data da Solicitação',
    key: 'created_at',
    textAlign: 'left',
    width: 4,
    sortKey: 'ExportProcesses.created_at',
  },

  {
    content: 'Data do Processamento',
    key: 'execution_start',
    textAlign: 'left',
    width: 4,
    sortKey: 'execution_start',
  },

  {
    content: 'Download',
    key: 'status',
    textAlign: 'center',
    width: 2,
    sortKey: 'status',
  },
]

export default header
