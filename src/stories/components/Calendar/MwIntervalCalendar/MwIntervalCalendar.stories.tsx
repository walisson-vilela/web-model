import React, { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { IntervalCalendar } from '../../../../components/Calendar'
import type { AbsoluteIntervalCalendarProps } from '../../../../components/Calendar/interfaces'
import { getStarWars } from '../../../../services'

import argTypes from './argTypes'

type IntervalCalendarProps = AbsoluteIntervalCalendarProps & { absolute: true }

function IntervalCalendarExample(args: IntervalCalendarProps) {
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

  return (
    <div style={{ position: 'relative' }}>
      <button type='button' onClick={() => setOpen((prev) => !prev)}>
        {open ? 'close' : 'open'}
      </button>

      <IntervalCalendar
        {...args}
        absolute
        initialMonth={initialMonth}
        initialValue={[null, null]}
        open={open}
        time
        onSubmit={{
          onClick: (value) => console.log('submit\n', { value }),
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
  id: 'IntervalCalendar',
  title: 'Components/Calendar/type="interval"',
  component: IntervalCalendar as React.FunctionComponent<IntervalCalendarProps>,
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

export const IntervalCalendarStory: Story = {
  render: (args) => <IntervalCalendarExample {...args} />,
}

export default meta
