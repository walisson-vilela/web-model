import type { Meta, StoryObj } from '@storybook/react-webpack5'

import Password from '../../../../components/Input/components/Password'

import argTypes from './argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  id: 'MwPassword',
  title: 'Components/Input/type="password"',
  component: Password,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes,
} as Meta<typeof Password>

type Story = StoryObj<typeof meta>

export const MwPassword: Story = {
  args: {
    label: 'Label',
    required: false,
    disabled: false,
    invalid: false,
    setValue: (value: string) => {
      console.log(`set value to: "${value}"`)
    },
    type: 'password',
  },
}

export default meta
