import { FiltersInterfaces } from '@mw-kit/mw-manager'

const filters: FiltersInterfaces.Filter[] = [
  {
    label: 'Tipo',
    name: 'extension',
    options: [
      {
        label: 'Power Point (PPT)',
        value: 'ppt',
      },
      {
        label: 'Zip',
        value: 'zip',
      },
      {
        label: 'Excel',
        value: 'xlsx',
      },
      {
        label: 'Pdf',
        value: 'pdf',
      },
      {
        label: 'Outros',
        value: null,
      },
    ],
  },
]

export default filters
