import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'ID',
    key: 'id',
    textAlign: 'left',
    width: 2,
    sortKey: 'id',
  },
  {
    content: 'Formulário',
    key: 'name',
    textAlign: 'left',
    width: 6,
    sortKey: 'name',
  },
  {
    content: '% Realizado P-1',
    key: 'accomplished_p1',
    textAlign: 'center',
    width: 2,
    sortKey: 'accomplished_p1',
  },
  {
    content: '% Realizado P0',
    key: 'accomplished_p0',
    textAlign: 'center',
    width: 2,
    sortKey: 'accomplished_p0',
  },
  {
    content: 'Alcance %',
    key: 'reach',
    textAlign: 'center',
    width: 2,
    sortKey: 'reach',
  },
  {
    content: 'Campos Padrões',
    key: 'default_fields',
    textAlign: 'center',
    width: 2,
    sortKey: 'default_fields',
  },
]

export default header
