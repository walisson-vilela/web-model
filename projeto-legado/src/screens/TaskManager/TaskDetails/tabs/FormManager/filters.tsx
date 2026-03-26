import { FiltersInterfaces } from '@mw-kit/mw-manager'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: '% Realizado P0',
    name: 'accomplished_p0',
    options: [
      { label: '0 a 60', value: '0 a 60' },
      { label: '61 a 90', value: '61 a 90' },
      { label: '91 a 100', value: '91 a 100' },
    ],
  },
  {
    label: 'Alcance %',
    name: 'reach',
    options: [
      { label: '0 a 60', value: '0 a 60' },
      { label: '61 a 90', value: '61 a 90' },
      { label: '91 a 100', value: '91 a 100' },
    ],
  },
]

export default filters
