import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Ponto de Atendimento',
    key: 'name',
    textAlign: 'left',
    width: 2,
    sortKey: 'name',
  },
  {
    content: 'Canal',
    key: 'chain_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'chain',
  },
  {
    content: 'Roteiro',
    key: 'route_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'route',
  },
  {
    content: 'Área de Atuação',
    key: 'region_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'region',
  },
  {
    content: 'Executor',
    key: 'executor_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'executor',
  },
  {
    content: 'Função',
    key: 'role_name',
    textAlign: 'left',
    width: 2,
    sortKey: 'role',
  },
  {
    content: 'Qtd. Visita',
    key: 'visit_count',
    textAlign: 'center',
    width: 1,
    sortKey: 'visit_count',
  },
  {
    content: '% Realizado P0',
    key: 'task_percent',
    textAlign: 'center',
    width: 1,
    sortKey: 'task_percent',
  },
  {
    content: 'Motivo de Não Realização',
    key: 'reason_not_concluded',
    textAlign: 'left',
    width: 2,
    sortKey: 'reason_not_concluded',
  },
]

export default header
