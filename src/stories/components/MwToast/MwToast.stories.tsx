import type { Meta, StoryObj } from '@storybook/react-webpack5'

import Toast from '../../../components/Toast'

import argTypes from './argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  id: 'MwToast',
  title: 'Components/MwToast',
  component: Toast,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes,
} as Meta<typeof Toast>

type Story = StoryObj<typeof meta>

export const MwToast: Story = {
  args: {
    color: 'success',
    size: 'normal',
    title: '',
    description: '',
    onClose: (e) => console.log('close', e),
  },
}

export default meta
