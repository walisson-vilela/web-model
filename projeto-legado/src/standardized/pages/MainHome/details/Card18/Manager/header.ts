import type { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'ID',
    key: 'id',
    textAlign: 'left',
    width: 1,
    sortKey: 'id',
  },
  {
    content: 'PDV',
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
    content: 'Área de atuação',
    key: 'area',
    textAlign: 'center',
    width: 2,
    sortKey: 'area',
  },
  {
    content: 'Executor',
    key: 'executor',
    textAlign: 'center',
    width: 2,
    sortKey: 'executor',
  },
  {
    content: 'Data da Ocorrência',
    key: 'occurrence_date',
    textAlign: 'center',
    width: 2,
    sortKey: 'occurrence_date',
  },
  {
    content: 'Tipo Ocorrência',
    key: 'occurrence_type',
    textAlign: 'center',
    width: 2,
    sortKey: 'occurrence_type',
  },
  {
    content: 'Observação',
    key: 'observation',
    textAlign: 'center',
    width: 1,
  },
  {
    content: 'Imagem',
    key: 'image',
    textAlign: 'center',
    width: 1,
  },
]

export default header
