import type { Meta, StoryObj } from '@storybook/react-webpack5'

import Indicator from '../../../components/Indicator'

import argTypes from './argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  id: 'Indicator',
  title: 'Components/Indicator',
  component: Indicator,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes,
} as Meta<typeof Indicator>

type Story = StoryObj<typeof meta>

export const IndicatorStory: Story = {
  args: {
    size: 'small',
    type: 'default',
    children: 'Label',
    labelColor: 'greyishBlue',
  },
}

export default meta
