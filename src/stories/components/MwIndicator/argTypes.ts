import type { ArgTypes } from '@storybook/react-webpack5'

import type { IndicatorProps } from '../../../components/Indicator/interfaces'

const argTypes: Partial<ArgTypes<IndicatorProps>> = {
  size: {
    description: 'Define size of the bullet',
    table: {
      defaultValue: { summary: 'small' },
    },
    control: 'select',
  },
  type: {
    description: 'Defines the type of the bullet ',
    table: {
      defaultValue: { summary: 'default' },
    },
    control: 'select',
  },
  children: {
    description: 'Text that will be next to the indicator',
    table: {
      defaultValue: { summary: '' },
    },
    control: 'text',
  },
  labelColor: {
    description: 'Define the label color',
    table: {
      defaultValue: { summary: '' },
    },
  },
}

export default argTypes
