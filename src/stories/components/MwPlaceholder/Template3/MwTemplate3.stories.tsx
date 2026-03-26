import type { Meta, StoryObj } from '@storybook/react-webpack5'

import Placeholder from '../../../../components/Placeholder/components/Template3'

import argTypes from './argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  id: 'Template3',
  title: 'Components/Placeholder/type="template3"',
  component: Placeholder,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes,
} as Meta<typeof Placeholder>

type Story = StoryObj<typeof meta>

export const Template3: Story = {
  args: {
    type: 'template3',
    loading: true,
  },
}

export default meta
