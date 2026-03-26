import { useEffect, useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-webpack5'

import Time from '../../../../components/Input/components/Time'

import argTypes from './argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  id: 'Time',
  title: 'Components/Input/type="time"',
  component: Time,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes,
} as Meta<typeof Time>

type Story = StoryObj<typeof meta>

export const TimeStory: Story = {
  args: {
    label: 'Label',
    required: false,
    disabled: false,
    invalid: false,
    loading: false,
    clearable: false,
    setValue: (value: string) => {
      console.log(`set value to: "${value}"`)
    },
    type: 'time',
    icon: {
      icon: {
        type: 'feather',
        icon: 'clock',
        color: 'blue',
        onClick: () => {
          console.log('icon clicked')
        },
      },
    },
  },
  render: (args) => {
    const [value, setValue] = useState<string>('')

    useEffect(() => {
      console.log({ value })
    }, [value])

    return <Time {...args} type='time' value={value} setValue={setValue} />
  },
}

export default meta
