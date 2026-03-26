import type { ArgTypes } from '@storybook/react-webpack5'

import type { DatePickerProps } from '../../../../components/Input/components/DatePicker/interfaces'

const argTypes: Partial<ArgTypes<DatePickerProps>> = {
  borderless: {
    description: 'Define if the input has no borders.',
    table: {
      defaultValue: { summary: 'false' },
    },
    control: 'boolean',
  },
  paddingless: {
    description: 'Define if the input has no padding.',
    table: {
      defaultValue: { summary: 'false' },
    },
    control: 'boolean',
  },
}

export default argTypes
