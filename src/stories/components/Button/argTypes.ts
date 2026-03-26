import type { ArgTypes } from '@storybook/react-webpack5'

import type { ButtonProps } from '../../../components/Button/interfaces'
import { colors } from '../../../theme/constants'

const argTypes: Partial<ArgTypes<ButtonProps>> = {
  content: {
    description: 'Text inside the button.',
  },
  loading: {
    description: 'Define if the button is loading.',
    table: {
      defaultValue: { summary: 'false' },
    },
  },
  type: {
    description: 'Specifies if is a clickable, submit or a reset button.',
    type: 'string',
    table: {
      defaultValue: { summary: '"button"' },
    },
    control: 'select',
  },
  size: {
    description: 'Specifies the button size.',
    type: {
      name: 'enum',
      value: ['tiny', 'mini', 'small', 'large', 'big'],
    },
    table: {
      defaultValue: { summary: '"small"' },
    },
    control: 'select',
  },
  color: {
    description: 'Define the color of button.',
    type: {
      name: 'enum',
      value: Object.keys(colors),
    },
    table: {
      defaultValue: { summary: '"blue"' },
    },
    control: {
      type: 'select',
      disable: true,
    },
  },
  disabled: {
    description: 'Define if the button is disabled.',
    type: 'boolean',
    control: 'boolean',
  },
  appearance: {
    description:
      'Specifies if the button style is solid, bordered or text only.',
    table: {
      defaultValue: { summary: '"solid"' },
    },
    control: 'select',
    options: ['solid', 'bordered', 'link', 'borderless'],
  },
  children: { control: false },
}

export default argTypes
