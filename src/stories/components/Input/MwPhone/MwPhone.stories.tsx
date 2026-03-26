import React, { useEffect, useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-webpack5'

import Phone from '../../../../components/Input/components/Phone'

import argTypes from './argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  id: 'IntlTel',
  title: 'Components/Input/type="phone"',
  component: Phone,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes,
} as Meta<typeof Phone>

type Story = StoryObj<typeof meta>

export const PhoneStory: Story = {
  args: {
    label: 'Label',
    required: false,
    disabled: false,
    invalid: false,
    loading: false,
    clearable: false,
  },
  render: (args) => {
    const [value, setValue] = useState<string>('')

    useEffect(() => console.log(value), [value])

    return (
      <React.Fragment>
        <button type='button' onClick={() => setValue('+55 31982761260')}>
          &times;
        </button>

        <Phone {...args} type='phone' value={value} setValue={setValue} />
      </React.Fragment>
    )
  },
}

export default meta
