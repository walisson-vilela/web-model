import { useEffect, useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-webpack5'

import Form from '../../../../components/Form'
import Input from '../../../../components/Input/components/Input'

import argTypes from './argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  id: 'MwInput',
  title:
    'Components/Input/type="text" or "number" or "search" or "email" or "url"',
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes,
} as Meta<typeof Input>

type Story = StoryObj<typeof meta>

const cpf = (value: string) => {
  const v = value.replaceAll('.', '')
  const s = [v.substring(0, 3), v.substring(3, 6), v.substring(6, 9)]
  return s.filter((e) => e !== '').join('.')
}

export const MwInput: Story = {
  args: {
    label: 'Label',
    name: 'name',
    placeholder: 'Text',
    required: false,
    arrows: false,
    disabled: false,
    invalid: false,
    loading: false,
    clearable: false,
    readOnly: false,
    type: 'text',
    icon: {
      icon: {
        type: 'feather',
        icon: 'zap',
        color: 'green',
        onClick: () => {
          console.log('icon clicked')
        },
      },
      position: 'left',
    },
    mask: cpf,
  },
  render: (args) => {
    const [value, setValue] = useState<string>('1234')

    useEffect(() => {
      console.log(`set value to: "${value}"`, value)
    }, [value])

    return (
      <Form>
        <Input {...args} {...{ value, setValue }} />
      </Form>
    )
  },
}

export default meta
