import { useEffect, useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-webpack5'

import Form from '../../../../components/Form'
import Checkbox from '../../../../components/Input/components/Checkbox'

import argTypes from './argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  id: 'MwCheckbox',
  title: 'Components/Input/type="checkbox"',
  component: Checkbox,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes,
} as Meta<typeof Checkbox>

type Story = StoryObj<typeof meta>

export const MwCheckbox: Story = {
  args: {
    name: 'name',
    label: 'Input label',
    disabled: false,
    required: false,
    invalid: false,
    padding: {
      top: 's1',
      left: 's2',
      bottom: 's3',
      right: '21px',
    },
    type: 'checkbox',
  },
  render: (args) => {
    const [checked, setChecked] = useState<boolean>(true)

    useEffect(() => {
      console.log({ value: checked })
    }, [checked])

    return (
      <Form>
        <Checkbox
          {...args}
          onChange={(e) => setChecked(e.target.checked)}
          checked={checked}
        />
      </Form>
    )
  },
}

export default meta
