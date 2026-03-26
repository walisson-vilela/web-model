import type { ArgTypes } from '@storybook/react-webpack5'

import type { TimeProps } from '../../../../components/Input/components/Time/interfaces'

const argTypes: Partial<ArgTypes<TimeProps>> = {
  label: {
    description: 'Input label.',
    table: {
      defaultValue: { summary: 'Label' },
    },
  },
  placeholder: {
    description: 'Input placeholder.',
    table: {
      defaultValue: { summary: 'Text' },
    },
    control: 'text',
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
      defaultValue: { summary: 'time' },
    },
  },
  icon: {
    description: 'Input type.',
  },
}

export default argTypes
