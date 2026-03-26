import { MwEllipsisContainer } from '@mw-kit/mw-ui'
import type { Filter } from '@mw-kit/mw-ui/types'

const entireDay: Filter = {
  label: {
    element: <MwEllipsisContainer children='Dia Inteiro' />,
    text: 'Dia Inteiro',
  },
  name: 'entire_day',
  options: [
    {
      label: 'Sim',
      value: 1,
    },
    {
      label: 'Não',
      value: 0,
    },
  ],
}

const filters: Filter[] = [entireDay]

export default filters
