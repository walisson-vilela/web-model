import { useEffect, useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-webpack5'

import Tags from '../../../../components/Input/components/Tags'

import argTypes from './argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  id: 'Tags',
  title: 'Components/Input/type="tags"',
  component: Tags,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes,
} as Meta<typeof Tags>

type Story = StoryObj<typeof meta>

export const TagsStory: Story = {
  args: {
    label: 'Input label',
    placeholder: 'Input placeholder',
    disabled: false,
    required: false,
    invalid: false,
    unique: false,
    maxTags: Number.POSITIVE_INFINITY,
    paddingless: false,
    borderless: false,
    type: 'tags',
    onBeforeAdd: (v: string) => v,
  },
  render: (args) => {
    const [value, setValue] = useState<string[]>([])

    useEffect(() => {
      console.log('new value', value)
    }, [value])

    return (
      <Tags
        {...args}
        type='tags'
        value={value}
        setValue={setValue}
        validate={(value: string) => {
          console.log({ value })
          return value.length > 1
        }}
      />
    )
  },
}

export default meta
