import type { Option } from '.'

import type { ArgTypes } from '@storybook/react-webpack5'

import type { CommonSelectProps } from '../../../interfaces'

const argTypes: Partial<ArgTypes<CommonSelectProps<Option>>> = {
  label: {
    description: 'Input label.',
    table: {
      defaultValue: { summary: 'Text' },
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

  disabled: {
    description: 'Define if input is disabled.',
    table: {
      defaultValue: { summary: 'false' },
    },
    control: 'boolean',
  },

  required: {
    description: 'Define if input is required.',
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

  viewMode: {
    description: 'Define if input is in view mode.',
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

  overscan: {
    description:
      'The number of items to render above and below the visible area.',
    table: {
      defaultValue: { summary: '2' },
    },
    control: 'number',
  },

  estimateSize: {
    description: 'The estimated height for each item.',
    table: {
      defaultValue: { summary: '46' },
    },
    control: 'number',
  },

  rules: {
    description: 'List of rules to enable an option.',
  },
}

export default argTypes
