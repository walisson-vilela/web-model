import { useEffect, useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-webpack5'

import DateTime from '../../../../components/Input/components/DateTime'
import { dateCompare } from '../../../../functions/validators'
import { getStarWars } from '../../../../services'

import argTypes from './argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  id: 'MwDateTime',
  title: 'Components/Input/type="datetime"',
  component: DateTime,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes,
} as Meta<typeof DateTime>

type Story = StoryObj<typeof meta>

export const MwDateTime: Story = {
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
    step: 'day',
  },
  render: (args) => {
    const [value, setValue] = useState<string>('')

    useEffect(() => {
      console.log({ value })
    }, [value])

    return (
      <DateTime
        {...args}
        type='datetime'
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
          time: (value) => {
            return value && dateCompare(value, new Date(), 'eq', false)
              ? undefined
              : {}
          },
        }}
      />
    )
  },
}

export default meta
