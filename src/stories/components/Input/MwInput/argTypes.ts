import type { ArgTypes } from '@storybook/react-webpack5'

import type { InputProps } from '../../../../components/Input/components/Input/interfaces'

const argTypes: Partial<ArgTypes<InputProps>> = {
  label: {
    description: 'Input label.',
    table: {
      defaultValue: { summary: 'Label' },
    },
    control: 'text',
  },
  name: {
    description: 'Form field name. Required to Form Context to work',
    table: {
      defaultValue: { summary: 'Name' },
    },
    control: 'text',
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
  arrows: {
    description: 'Define if input number shows html arrows.',
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
  readOnly: {
    description: 'Define if input is on read only mode.',
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
      defaultValue: { summary: 'text' },
    },
  },
  icon: {
    description: 'Input type.',
  },
  mask: {
    description: 'Input mask.',
  },
}

export default argTypes
