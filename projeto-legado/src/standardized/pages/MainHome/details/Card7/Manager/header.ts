import { ColumnInterface } from '@mw-kit/mw-manager'

const header: ColumnInterface[] = [
  {
    content: 'Nome',
    key: 'name',
    textAlign: 'left',
    width: 3,
    sortKey: 'name',
  },
  {
    content: 'Supervisor',
    key: 'supervisor',
    textAlign: 'left',
    width: 3,
    sortKey: 'supervisor',
  },
  {
    content: 'Nome do roteiro',
    key: 'route_name',
    textAlign: 'left',
    width: 3,
    sortKey: 'route_name',
  },
  {
    content: "Qtde. PDV's",
    key: 'pdvs_day',
    textAlign: 'center',
    width: 2,
    sortKey: 'pdvs_day',
  },
  {
    content: 'Meta de Variação',
    key: 'variation_goal',
    textAlign: 'center',
    width: 2,
    sortKey: 'variation_goal',
  },
  {
    content: 'Abaixo',
    key: 'below_label',
    textAlign: 'center',
    width: 2,
    sortKey: 'below',
  },
  {
    content: 'Acima',
    key: 'above_label',
    textAlign: 'center',
    width: 2,
    sortKey: 'above',
  },
  {
    content: '% Fora do Roteiro',
    key: 'out_of_route',
    textAlign: 'center',
    width: 2,
    sortKey: 'out_of_route',
  },
]

export default header
