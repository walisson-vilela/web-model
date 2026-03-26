import React, { useEffect, useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-webpack5'

import Form from '../../../../components/Form'
import Range from '../../../../components/Input/components/Range'

import argTypes from './argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  id: 'Range',
  title: 'Components/Input/type="range"',
  component: Range,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes,
} as Meta<typeof Range>

type Story = StoryObj<typeof meta>

export const RangeStory: Story = {
  args: {
    // label: 'Label',
    name: 'name',
    // minLabel: 'Minimum',
    // maxLabel: 'Maximum',
    disabled: false,
    invalid: false,
    required: false,
    viewMode: false,
    // step: 5,
  },
  render: (args) => {
    const [value, setValue] = useState<number>(50)

    useEffect(() => {
      console.log('Changed value to', value)
    }, [value])

    return (
      <div style={{ marginTop: '50px', marginLeft: '100px', width: '200px' }}>
        <Form>
          <Range
            {...args}
            type='range'
            value={value}
            setValue={setValue as React.Dispatch<React.SetStateAction<number>>}
            markers={{
              markers: [-50, 0, 50, 100],
              position: 'top',
              strict: true,
            }}
            step='1'
          />
        </Form>
      </div>
    )
  },
}

export default meta
