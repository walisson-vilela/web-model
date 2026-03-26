import type { DropdownInterfaces } from '@mw-kit/mw-manager'

import type { BodyInterface } from './types'

export const getItemMenu = (item: BodyInterface): DropdownInterfaces.Item[] => {
  return [
    {
      content: 'Monitoramento GPS',
      onClick: () => console.log('Monitoramento GPS', item),
      rules: [],
    },
  ]
}
