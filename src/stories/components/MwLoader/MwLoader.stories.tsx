import type { Meta, StoryObj } from '@storybook/react-webpack5'

import Loader from '../../../components/Loader'

import argTypes from './argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  id: 'Loader',
  title: 'Components/Loader',
  component: Loader,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes,
} as Meta<typeof Loader>

type Story = StoryObj<typeof meta>

export const LoaderStory: Story = {
  args: {
    color: 'blue',
    bgColor: 'blue',
    size: '43px',
    borderSize: '2px',
  },
}

export default meta
