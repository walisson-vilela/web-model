import type { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Ponto de atendimento',
    key: 'store',
    textAlign: 'left',
    width: 3,
    sortKey: 'store',
  },
  {
    content: 'Nome do roteiro',
    key: 'route_name',
    textAlign: 'center',
    width: 2,
    sortKey: 'route_name',
  },
  {
    content: 'Origem',
    key: 'origin',
    textAlign: 'center',
    width: 2,
    sortKey: 'origin',
  },
  {
    content: 'Executor',
    key: 'executor',
    textAlign: 'center',
    width: 2,
    sortKey: 'executor',
  },
  {
    content: 'Justificativa de Não Atendimento',
    key: 'justification',
    textAlign: 'center',
    width: 4,
    sortKey: 'justification',
  },
  {
    content: 'Data da Ocorrência',
    key: 'occurrence_date',
    textAlign: 'center',
    width: 2,
    sortKey: 'occurrence_date',
  },
  {
    content: 'Total de dias',
    key: 'total_days',
    textAlign: 'center',
    width: 2,
    sortKey: 'total_days',
  },
]

export default header
