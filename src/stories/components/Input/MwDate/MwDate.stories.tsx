import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-webpack5'

import Date from '../../../../components/Input/components/Date'
import { getStarWars } from '../../../../services'

import argTypes from './argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  id: 'Date',
  title: 'Components/Input/type="date"',
  component: Date,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes,
} as Meta<typeof Date>

type Story = StoryObj<typeof meta>

export const DateStory: Story = {
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
    type: 'date',
  },
  render: (args) => {
    const [value, setValue] = useState<string>('')

    return (
      <Date
        {...args}
        type='date'
        value={value}
        setValue={setValue}
        picker={{
          onChangeMonth: async (calendar) => {
            const response = await getStarWars('', 1)
            console.log({ calendar, response })
          },
          getDay: (day) => ({
            indicator: (['warning', 'success', 'danger'] as const)[
              day.getDate() % 3
            ],
          }),
        }}
      />
    )
  },
}

export default meta
