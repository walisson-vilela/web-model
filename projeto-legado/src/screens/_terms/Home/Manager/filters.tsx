import { FiltersInterfaces } from '@mw-kit/mw-manager'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Tipo Documento',
    name: 'title',
    options: [
      { label: 'Politica de Privacidade', value: 'Politica de Privacidade' },
      { label: 'Termo de Uso', value: 'Termo de Uso' },
    ],
  },
  {
    label: 'Alcance %',
    name: '',
    options: [
      { label: '0 - 60 ', value: 0 },
      { label: '60 - 85', value: 1 },
      { label: '85 - 100', value: 2 },
    ],
  },
]

export default filters
