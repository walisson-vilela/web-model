import type { ArgTypes } from '@storybook/react-webpack5'

import { featherIconNames } from '../../../../assets/icons/feather'
import type { FeatherIcon } from '../../../../components/Icon/interfaces'

const argTypes: Partial<ArgTypes<FeatherIcon>> = {
  type: {
    description: 'Specifies the icon type.',
    type: {
      name: 'enum',
      value: ['feather'],
    },
    options: ['feather'],
    control: 'select',
  },
  icon: {
    description: 'Specifies the icon.',
    table: {},
    control: {
      type: 'select',
    },
    options: [...featherIconNames].sort(),
  },
  color: {
    description: 'Specifies the icon color.',
    table: {
      defaultValue: { summary: '"black"' },
    },
    control: 'text',
  },
  width: {
    description: 'Specifies the icon width.',
    table: {
      defaultValue: { summary: '"24px"' },
    },
    control: 'text',
  },
  height: {
    description: 'Specifies the icon height.',
    table: {
      defaultValue: { summary: '"auto"' },
    },
    control: 'text',
  },
}

export default argTypes
