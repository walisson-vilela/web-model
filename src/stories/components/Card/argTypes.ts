import type { ArgTypes } from '@storybook/react-webpack5'

import type { CardProps } from '../../../components/Card/interfaces'

const argTypes: Partial<ArgTypes<CardProps>> = {
  size: {
    description: 'Specifies the size of the card.',
    table: {
      defaultValue: { summary: 'small' },
    },
    control: 'select',
  },
  borderType: {
    description: 'Specifies the border color',
    table: {
      defaultValue: { summary: 'info' },
    },
    control: 'select',
  },
  children: {
    description: 'React children to fill the card',
  },
}

export default argTypes
