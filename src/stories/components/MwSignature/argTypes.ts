import type { ArgTypes } from '@storybook/react-webpack5'

import type Signature from '../../../components/Signature'
import { colors } from '../../../theme/constants'

const argTypes: Partial<ArgTypes<Parameters<typeof Signature>[0]>> = {
  label: {
    description: 'Define the input label.',
    type: {
      name: 'string',
    },
    table: {
      defaultValue: { summary: '"Digite seu nome"' },
    },
    control: {
      type: 'text',
    },
  },
  inputPlaceholder: {
    description: 'Define the input placeholder.',
    type: {
      name: 'string',
    },
    table: {
      defaultValue: { summary: '"Digite seu nome"' },
    },
    control: {
      type: 'text',
    },
  },
  canvasPlaceholder: {
    description: 'Define the canvas placeholder.',
    type: {
      name: 'string',
    },
    table: {
      defaultValue: { summary: '"Assine aqui"' },
    },
    control: {
      type: 'text',
    },
  },
  penColor: {
    description: 'Define the draw color.',
    type: {
      name: 'enum',
      value: Object.keys(colors),
    },
    table: {
      defaultValue: { summary: '"black"' },
    },
    control: {
      type: 'select',
    },
  },
  backgroundColor: {
    description: 'Define the background color.',
    type: {
      name: 'enum',
      value: Object.keys(colors),
    },
    table: {
      defaultValue: { summary: '"white"' },
    },
    control: {
      type: 'select',
    },
  },
}

export default argTypes
