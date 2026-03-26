import type { Meta, StoryObj } from '@storybook/react-webpack5'

import Icon from '../../../../components/Icon'
import type { FeatherIcon } from '../../../../components/Icon/interfaces'

import argTypes from './argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  id: 'MwIconFeather',
  title: 'Components/Icon/MwIconFeather',
  component: Icon as React.FunctionComponent<FeatherIcon>,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes,
} as Meta<React.FunctionComponent<FeatherIcon>>

type Story = StoryObj<typeof meta>

export const MwIconFeather: Story = {
  args: {
    type: 'feather',
    icon: 'activity',
    color: 'green',
    width: '24px',
    height: '24px',
  },
}

export default meta
