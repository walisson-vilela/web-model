import type { ArgTypes } from '@storybook/react-webpack5'

import type { SwitchProps } from '../../../../components/Input/components/Switch/interfaces'

const argTypes: Partial<ArgTypes<SwitchProps>> = {
  name: {
    description: 'Form field name. Required to Form Context to work',
    table: {
      defaultValue: { summary: 'Name' },
    },
    control: 'text',
  },
  label: {
    description: 'text that will be next to the input',
    table: {
      defaultValue: { summary: '' },
    },
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
  onChange: {
    description: 'Input action handler.',
    table: {
      type: {
        summary: '(event) => void',
        detail: 'event:  FormEvent<HTMLInputElement>',
      },
      defaultValue: { summary: '() => {}' },
    },
  },
  onClick: {
    description: 'Input action handler.',
    table: {
      type: {
        summary: '(event) => void',
        detail: 'event: MouseEvent<HTMLButtonElement, MouseEvent>',
      },
      defaultValue: { summary: '() => {}' },
    },
  },
  type: {
    description: 'Input type.',
    table: {
      defaultValue: { summary: 'switch' },
    },
  },
}

export default argTypes
