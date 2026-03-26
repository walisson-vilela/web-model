import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-webpack5'

import DatePicker from '../../../../components/Input/components/DatePicker'
import { getStarWars } from '../../../../services'

import argTypes from './argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  id: 'MwDatePicker',
  title: 'Components/Input/type="datepicker"',
  component: DatePicker,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes,
} as Meta<typeof DatePicker>

type Story = StoryObj<typeof meta>

export const MwDatePicker: Story = {
  args: {
    borderless: false,
    paddingless: false,
  },
  render: (args) => {
    const [value, setValue] = useState<string>('')

    return (
      <DatePicker
        {...args}
        type='datepicker'
        value={value}
        setValue={setValue}
        min={new Date('2022-06-05 00:00:00')}
        max={new Date('2022-06-29 00:00:00')}
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
