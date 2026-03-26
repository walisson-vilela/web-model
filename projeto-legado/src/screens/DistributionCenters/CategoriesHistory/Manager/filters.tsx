import { FiltersInterfaces } from '@mw-kit/mw-manager'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Particularidade',
    name: 'particularities',
    options: [
      { label: 'Sim', value: 1 },
      { label: 'Não', value: 0 },
    ],
  },
  {
    label: 'Forma de Rateio',
    name: 'apportionment',
    options: [
      { label: 'Linear', value: 0 },
      { label: 'Ponderado Faturamento', value: 1 },
      { label: 'Não se Aplica', value: 2 },
    ],
  },
]

export default filters
