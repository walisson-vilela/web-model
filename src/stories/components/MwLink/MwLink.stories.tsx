import type { Meta, StoryObj } from '@storybook/react-webpack5'

import Link from '../../../components/Link'

import argTypes from './argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  id: 'MwLink',
  title: 'Components/MwLink',
  component: Link,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes,
} as Meta<typeof Link>

type Story = StoryObj<typeof meta>

export const MwLink: Story = {
  args: {
    children: 'Link',
    colorSetting: {
      normal: 'red',
      hover: 'blue',
    },
    onClick: console.log,
  },
}

export default meta
