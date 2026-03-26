import type { ArgTypes } from '@storybook/react-webpack5'

import type { TagsProps } from '../../../../components/Input/components/Tags/interfaces'

const argTypes: Partial<ArgTypes<TagsProps>> = {
  label: {
    description: 'text that will be next to the input',
    table: {
      defaultValue: { summary: '' },
    },
  },
  placeholder: {
    description: 'text that will be next to the input',
  },
  disabled: {
    description: 'Define if the button is disabled.',
    table: {
      defaultValue: { summary: 'false' },
    },
    control: 'boolean',
  },
  required: {
    description: 'Define if the button is required.',
    table: {
      defaultValue: { summary: 'false' },
    },
    control: 'boolean',
  },
  invalid: {
    description: 'Define if the button is invalid.',
    table: {
      defaultValue: { summary: 'false' },
    },
    control: 'boolean',
  },
  unique: {
    description: 'Define if the tags should be unique.',
    table: {
      defaultValue: { summary: 'false' },
    },
    control: 'boolean',
  },

  maxTags: {
    description: 'Define if the max number of tags.',
  },
  paddingless: {
    description: 'Define if the tags should be paddingless.',
    table: {
      defaultValue: { summary: 'false' },
    },
    control: 'boolean',
  },
  borderless: {
    description: 'Define if the tags should be borderless.',
    table: {
      defaultValue: { summary: 'false' },
    },
    control: 'boolean',
  },
  type: {
    description: 'Input type.',
    table: {
      defaultValue: { summary: 'tags' },
    },
  },
  onBeforeAdd: {
    description: 'Method called before add a new tag',
  },
  onBlur: {
    description: 'Method called when an element loses focus',
  },
}

export default argTypes
