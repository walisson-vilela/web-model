import type { ArgTypes } from '@storybook/react-webpack5'

import type { DateTimeProps } from '../../../../components/Input/components/DateTime/interfaces'

const argTypes: Partial<ArgTypes<DateTimeProps>> = {
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
  step: {
    description: 'Define arrow step to increment and decrement value.',
    table: {
      type: {
        summary: 'StepOptions',
        detail: ['year', 'month', 'day', 'hour', 'minute', 'second']
          .map((e) => `"${e}"`)
          .join('\n'),
      },
      defaultValue: { summary: '"blue"' },
    },
    control: 'select',
  },
}

export default argTypes
