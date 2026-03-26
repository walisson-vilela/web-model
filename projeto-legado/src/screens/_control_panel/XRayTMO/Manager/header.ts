import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Impacto',
    key: 'impact_jsx',
    textAlign: 'left',
    width: 2,
    sortKey: 'impact',
  },
  {
    content: 'Roteiro',
    key: 'route_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'route_name',
  },
  {
    content: 'Executor',
    key: 'people_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'people_name',
  },
  {
    content: 'Supervisor',
    key: 'supervisor_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'supervisor_name',
  },
  {
    content: 'D',
    key: 'sunday_tmo_jsx',
    textAlign: 'center',
    width: 1,
    sortKey: 'sunday_tmo',
  },
  {
    content: 'S',
    key: 'monday_tmo_jsx',
    textAlign: 'center',
    width: 1,
    sortKey: 'monday_tmo',
  },
  {
    content: 'T',
    key: 'tuesday_tmo_jsx',
    textAlign: 'center',
    width: 1,
    sortKey: 'tuesday_tmo',
  },
  {
    content: 'Q',
    key: 'wednesday_tmo_jsx',
    textAlign: 'center',
    width: 1,
    sortKey: 'wednesday_tmo',
  },
  {
    content: 'Q',
    key: 'thursday_tmo_jsx',
    textAlign: 'center',
    width: 1,
    sortKey: 'thursday_tmo',
  },
  {
    content: 'S',
    key: 'friday_tmo_jsx',
    textAlign: 'center',
    width: 1,
    sortKey: 'friday_tmo',
  },
  {
    content: 'S',
    key: 'saturday_tmo_jsx',
    textAlign: 'center',
    width: 1,
    sortKey: 'saturday_tmo',
  },
  {
    content: 'TMO+ (S0)',
    key: 'tmo_positive_jsx',
    textAlign: 'left',
    width: 2,
    sortKey: 'tmo_positive',
  },
  {
    content: 'TMO- (S0)',
    key: 'tmo_negative_jsx',
    textAlign: 'left',
    width: 2,
    sortKey: 'tmo_negative',
  },
]

export default header
