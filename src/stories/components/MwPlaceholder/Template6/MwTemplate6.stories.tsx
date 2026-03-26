import type { Meta, StoryObj } from '@storybook/react-webpack5'

import Placeholder from '../../../../components/Placeholder/components/Template6'

import argTypes from './argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  id: 'Template6',
  title: 'Components/Placeholder/type="template6"',
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

export const Template6: Story = {
  args: {
    type: 'template6',
    loading: true,
  },
}

export default meta
