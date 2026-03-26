import type { ArgTypes } from '@storybook/react-webpack5'

import type { LoaderProps } from '../../../components/Loader/interfaces'

const argTypes: Partial<ArgTypes<LoaderProps>> = {
  color: {
    description: 'Specifies the icon color.',
    table: {
      defaultValue: { summary: '"white"' },
    },
    control: 'text',
  },
  bgColor: {
    description: 'Specifies the icon color.',
    table: {
      defaultValue: { summary: '"white"' },
    },
    control: 'text',
  },
  size: {
    description: 'Specifies the icon width.',
    control: 'text',
  },
  borderSize: {
    description: 'Specifies the icon width.',
    control: 'text',
  },
}

export default argTypes
