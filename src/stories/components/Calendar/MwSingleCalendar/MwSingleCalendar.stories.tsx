import React, { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { SingleCalendar } from '../../../../components/Calendar'
import type { AbsoluteSingleCalendarProps } from '../../../../components/Calendar/interfaces'
import { getStarWars } from '../../../../services'

import argTypes from './argTypes'

type IntervalCalendarProps = AbsoluteSingleCalendarProps & { absolute: true }

function SingleCalendarExample(args: IntervalCalendarProps) {
  const [open, setOpen] = useState(true)

  const max = new Date()
  max.setDate(15)
  max.setMonth(max.getMonth() + 4)
  max.setHours(18, 0, 0, 0)

  const min = new Date()
  min.setDate(15)
  min.setMonth(min.getMonth() + 2)
  min.setHours(8, 0, 0, 0)

  const initialMonth = new Date()
  initialMonth.setDate(15)
  initialMonth.setMonth(initialMonth.getMonth() + 1)
  initialMonth.setHours(8, 0, 0, 0)

  const initialValue = new Date()
  initialValue.setDate(15)
  initialValue.setMonth(initialValue.getMonth() + 2)
  initialValue.setHours(18, 0, 0, 0)

  return (
    <div style={{ position: 'relative' }}>
      <button type='button' onClick={() => setOpen((prev) => !prev)}>
        {open ? 'close' : 'open'}
      </button>

      <SingleCalendar
        {...args}
        absolute
        time
        initialMonth={initialMonth}
        initialValue={initialValue}
        open={open}
        max={max}
        min={min}
        onSubmit={{
          onClick: (value) => console.log('submit', { value }),
        }}
        onChangeMonth={async (calendar) => {
          const response = await getStarWars('', 1)
          console.log({ calendar, response })
        }}
        getDay={(day) => ({
          indicator: (['warning', 'success', 'danger'] as const)[
            day.getDate() % 3
          ],
        })}
      />
    </div>
  )
}

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  id: 'SingleCalendar',
  title: 'Components/Calendar/type="single"',
  component: SingleCalendar as React.FunctionComponent<IntervalCalendarProps>,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes,
} as Meta<React.FunctionComponent<IntervalCalendarProps>>

type Story = StoryObj<typeof meta>

export const SingleCalendarStory: Story = {
  render: (args) => <SingleCalendarExample {...args} />,
}

export default meta
