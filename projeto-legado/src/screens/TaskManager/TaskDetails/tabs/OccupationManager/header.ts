import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Área de Atuação',
    key: 'name',
    textAlign: 'left',
    width: 6,
    sortKey: 'name',
  },
  {
    content: 'PDVs',
    key: 'store_count',
    textAlign: 'center',
    width: 2,
    sortKey: 'store_count',
  },
  {
    content: 'Executores',
    key: 'executor_count',
    textAlign: 'center',
    width: 2,
    sortKey: 'executor_count',
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
]

export default header
