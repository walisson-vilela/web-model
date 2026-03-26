import { useEffect, useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-webpack5'

import Form from '../../../../components/Form'
import Switch from '../../../../components/Input/components/Switch'

import argTypes from './argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  id: 'Switch',
  title: 'Components/Input/type="switch"',
  component: Switch,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes,
} as Meta<typeof Switch>

type Story = StoryObj<typeof meta>

export const SwitchStory: Story = {
  args: {
    name: 'status',
    label: {
      label: 'Input label',
      before: 'Inativo',
      after: 'Ativo',
    },
    disabled: false,
    required: false,
    invalid: false,
    type: 'switch',
  },
  render: (args) => {
    const [checked, setChecked] = useState<boolean>(true)

    useEffect(() => {
      console.log({ value: checked })
    }, [checked])

    return (
      <Form>
        <Switch
          {...args}
          onChange={(e) => setChecked(e.target.checked)}
          checked={checked}
        />
      </Form>
    )
  },
}

export default meta
