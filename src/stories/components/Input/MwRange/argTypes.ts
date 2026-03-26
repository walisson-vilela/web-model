import type { ArgTypes } from '@storybook/react-webpack5'

import type { RangeProps } from '../../../../components/Input/components/Range/interfaces'

const argTypes: Partial<ArgTypes<RangeProps>> = {
  // label: {
  //   description: 'Input label.',
  //   table: {
  //     defaultValue: { summary: 'Label' },
  //   },
  // },
  name: {
    description: 'Form field name. Required to Form Context to work',
    table: {
      defaultValue: { summary: 'Name' },
    },
    control: 'text',
  },
  // minLabel: {
  //   description: 'Input label.',
  //   table: {
  //     defaultValue: { summary: 'Label' },
  //   },
  //   control: 'string',
  // },
  // maxLabel: {
  //   description: 'Input label.',
  //   table: {
  //     defaultValue: { summary: 'Label' },
  //   },
  //   control: 'string',
  // },
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
  required: {
    description: 'Define if input is required.',
    table: {
      defaultValue: { summary: 'false' },
    },
    control: 'boolean',
  },
  viewMode: {
    description: 'Define if input is viewMode.',
    table: {
      defaultValue: { summary: 'false' },
    },
    control: 'boolean',
  },
  // step: {
  //   description: 'Define range step.',
  //   table: {
  //     defaultValue: { summary: 'false' },
  //   },
  //   control: 'number',
  // },
}

export default argTypes
