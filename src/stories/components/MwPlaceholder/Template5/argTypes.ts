import type { ArgTypes } from '@storybook/react-webpack5'

import type { PlaceholderProps } from '../../../../components/Placeholder/interfaces'

const argTypes: Partial<ArgTypes<PlaceholderProps>> = {
  type: {
    description: 'template type.',
    table: {
      defaultValue: { summary: 'template4' },
    },
  },
  loading: {
    description: 'Verify is loading is running',
    table: {
      defaultValue: { summary: 'true' },
    },
  },
}

export default argTypes
