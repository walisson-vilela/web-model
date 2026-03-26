import type { ArgTypes } from '@storybook/react-webpack5'

import type { PhoneProps } from '../../../../components/Input/components/Phone/interfaces'

const argTypes: Partial<ArgTypes<PhoneProps>> = {
  label: {
    description: 'Input label.',
    table: {
      defaultValue: { summary: 'Label' },
    },
  },
  required: {
    description: 'Define if input is required.',
    table: {
      defaultValue: { summary: 'false' },
    },
    control: 'boolean',
  },
  disabled: {
    description: 'Define if input is disabled.',
    table: {
      defaultValue: { summary: 'false' },
    },
    control: 'boolean',
  },
  invalid: {
    description: 'Define if input is invalid.',
    table: {
      defaultValue: { summary: 'false' },
    },
    control: 'boolean',
  },
  loading: {
    description: 'Define if input is loading.',
    table: {
      defaultValue: { summary: 'false' },
    },
    control: 'boolean',
  },
  clearable: {
    description: 'Define if input is clearable.',
    table: {
      defaultValue: { summary: 'false' },
    },
    control: 'boolean',
  },
  setValue: {
    description: "Define if input is clearable and it's function.",
  },
  type: {
    description: 'Input type.',
    table: {
      defaultValue: { summary: 'phone' },
    },
  },
}

export default argTypes
