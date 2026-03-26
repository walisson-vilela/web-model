import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Status',
    key: 'active_jsx',
    textAlign: 'left',
    width: 2,
    sortKey: 'Classifications.active',
  },
  {
    content: 'ID',
    key: 'id',
    textAlign: 'left',
    width: 1,
    sortKey: 'Classifications.id',
  },
  {
    content: 'Cenário',
    key: 'scenery_label',
    textAlign: 'left',
    width: 5,
    sortKey: 'Classifications.scenery_label',
  },
  {
    content: 'Motivos e Classificações',
    key: 'name',
    textAlign: 'left',
    width: 4,
    sortKey: 'Classifications.name',
  },
  {
    content: 'Comportamento',
    key: 'temporary_label',
    textAlign: 'center',
    width: 2,
    sortKey: 'Classifications.temporary',
  },
  {
    content: 'Tipo',
    key: 'default_label',
    textAlign: 'center',
    width: 2,
    sortKey: 'Classifications.default',
  },
]

export default header
