import { SelectOption } from '@mw-kit/mw-ui/types'

import { strCmp } from '../../../../../../../utils/Validators'
import { Frequency } from '../../interfaces'

const list: { [k in Frequency]: SelectOption[] } = {
  '': [],
  D: [],
  W: [
    { label: 'Domingo', value: '0', data: {} },
    { label: 'Segunda-Feira', value: '1', data: {} },
    { label: 'Terça-Feira', value: '2', data: {} },
    { label: 'Quarta-Feira', value: '3', data: {} },
    { label: 'Quinta-Feira', value: '4', data: {} },
    { label: 'Sexta-Feira', value: '5', data: {} },
    { label: 'Sábado', value: '6', data: {} },
  ],
  M: [
    ...Array.from(Array(29).keys())
      .slice(1)
      .map((i) => ({
        label: i.toString(),
        value: i.toString(),
        data: {},
      })),
    {
      label: 'Útimo dia do mês',
      value: '-1',
      data: {},
    },
  ],
}

export const loader = async (search: string, rule: Frequency) => {
  const options = list[rule]

  const results = options.filter((e) =>
    strCmp(e.label as string, search, { contain: true }),
  )

  return {
    options: results,
    lastPage: true,
  }
}
