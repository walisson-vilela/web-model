import { useEffect, useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-webpack5'

import Input from '../../../../components/Input'
import DateIntervalPicker from '../../../../components/Input/components/DateIntervalPicker'
import { dateCompare } from '../../../../functions/validators'
import { getStarWars } from '../../../../services'

import argTypes from './argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  id: 'DateIntervalPicker',
  title: 'Components/Input/type="date-interval-picker"',
  component: DateIntervalPicker,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes,
} as Meta<typeof DateIntervalPicker>

type Story = StoryObj<typeof meta>

export const DateIntervalPickerStory: Story = {
  args: {
    borderless: false,
    paddingless: false,
  },
  render: (args) => {
    const [value, setValue] = useState<[string, string]>(
      Input.useDefaultDateIntervalState,
    )

    useEffect(() => {
      console.log('value', value)
    }, [value])

    return (
      <DateIntervalPicker
        {...args}
        type='date-interval-picker'
        value={value}
        setValue={setValue}
        calendar={{
          onChangeMonth: async (calendar) => {
            const response = await getStarWars('', 1)
            console.log({ calendar, response })
          },
          getDay: (day) => ({
            indicator: (['warning', 'success', 'danger'] as const)[
              day.getDate() % 3
            ],
          }),
          time: [
            (value) => {
              return value && dateCompare(value, new Date(), 'eq', false)
                ? undefined
                : {}
            },
            {},
          ],
        }}
      />
    )
  },
}

export default meta
