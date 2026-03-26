import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Nome',
    key: 'people_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'Peoples.name',
  },
  {
    content: 'Função',
    key: 'role_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'Roles.name',
  },
  {
    content: 'Status',
    key: 'status_jsx',
    textAlign: 'left',
    width: 2,
    sortKey: 'Users.active',
  },
  {
    content: 'Motivo Inativação',
    key: 'inactivation_reason',
    textAlign: 'left',
    width: 2,
    sortKey: 'UserInactivationReasons.name',
  },
  {
    content: 'Supervisor',
    key: 'supervisor_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'Supervisors.name',
  },
  {
    content: 'Hierarquia',
    key: 'supervisor_hierarchy',
    textAlign: 'left',
    width: 2,
    sortKey: 'HierarchyElements.name',
  },
  {
    content: 'Última Notificação',
    key: 'mobile_date_jsx',
    textAlign: 'left',
    width: 2,
    sortKey: 'PeopleFeelings.mobile_date',
  },
  {
    content: 'Classificação',
    key: 'classification_jsx',
    textAlign: 'left',
    width: 2,
    sortKey: 'PeopleFeelings.feeling_id',
  },
  {
    content: 'Observação',
    key: 'note_jsx',
    textAlign: 'left',
    width: 2,
    sortKey: 'PeopleFeelings.note',
  },
]

export default header
