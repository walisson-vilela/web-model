import type { ArgTypes } from '@storybook/react-webpack5'

import type { FiltersProps } from '../../../../components/Filters/Filters/interfaces'

const argTypes: Partial<ArgTypes<FiltersProps>> = {
  items: {
    description: 'Define the menu options.',
  },
}

export default argTypes
