import type { ArgTypes } from '@storybook/react-webpack5'

import type { ProgressBarProps } from '../../../components/ProgressBar/interfaces'

const argTypes: Partial<ArgTypes<ProgressBarProps>> = {
  type: {
    description: 'Define the the color of the progressBar ',
    table: {
      defaultValue: { summary: 'number' },
    },
    control: 'select',
  },
  value: {
    description: 'Define the width and value of the progress bar ',
    table: {
      defaultValue: { summary: 'number | null' },
    },
    control: 'number',
  },
}

export default argTypes
