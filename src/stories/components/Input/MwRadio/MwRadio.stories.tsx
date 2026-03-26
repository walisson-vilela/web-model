import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-webpack5'

import Radio from '../../../../components/Input/components/RadioButton'

import argTypes from './argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  id: 'MwRadio',
  title: 'Components/Input/type="radio"',
  component: Radio,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes,
} as Meta<typeof Radio>

type Story = StoryObj<typeof meta>

export const MwRadio: Story = {
  args: {
    name: '',
    label: 'Input label',
    disabled: false,
    checked: false,
    required: false,
    invalid: false,
  },
  render: (args) => {
    const [checked, setChecked] = useState(false)

    return (
      <Radio
        {...args}
        type='radio'
        onChange={(e) => setChecked(e.target.checked)}
        checked={checked}
      />
    )
  },
}

export default meta
