import type { ArgTypes } from '@storybook/react-webpack5'

import type { SelectProps } from '../../../../components/Input/components/Select'

const argTypes: Partial<ArgTypes<SelectProps>> = {
  label: {
    description: 'Input label.',
    table: {
      defaultValue: { summary: 'Label' },
    },
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
  search: {
    description: 'Define if input has search filter.',
    table: {
      defaultValue: { summary: 'false' },
    },
    control: 'boolean',
  },
}

export default argTypes
