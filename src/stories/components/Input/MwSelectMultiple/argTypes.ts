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
  selectAll: {
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
  minSelected: {
    description:
      'Minimum number of selected options. Only enforced when set; if higher than maxSelected, the component flags an error and does not apply limits.',
    table: {
      defaultValue: { summary: 'undefined' },
    },
    control: { type: 'number', min: 0 },
  },
  maxSelected: {
    description:
      'Maximum number of selected options. Only enforced when set; if lower than minSelected, the component flags an error and does not apply limits.',
    table: {
      defaultValue: { summary: 'undefined' },
    },
    control: { type: 'number', min: 0 },
  },
}

export default argTypes
