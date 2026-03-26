import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Data',
    key: 'created_at',
    textAlign: 'left',
    width: 2,
    sortKey: 'Justifies.created_at',
  },

  {
    content: 'Usuário',
    key: 'people_jsx',
    textAlign: 'left',
    width: 2,
    sortKey: 'Peoples.name',
  },

  {
    content: 'Motivo Justificado',
    key: 'justify_type',
    textAlign: 'left',
    width: 3,
    sortKey: 'JustifyTypes.name',
  },

  {
    content: 'Período',
    key: 'period_jsx',
    textAlign: 'left',
    width: 2,
    sortKey: 'Justifies.start',
  },

  {
    content: 'Impacto',
    key: 'impact_jsx',
    textAlign: 'left',
    verticalAlign: 'center',
    width: 4,
    sortKey: 'impact',
  },

  {
    content: 'Anexo',
    key: 'file_jsx',
    textAlign: 'center',
    verticalAlign: 'center',
    width: 2,
    sortKey: 'Files.id',
  },
  {
    content: 'Ação',
    key: 'action_jsx',
    textAlign: 'center',
    verticalAlign: 'center',
    width: 2,
    sortKey: 'Justifies.audit_due_date',
  },
]

export default header
