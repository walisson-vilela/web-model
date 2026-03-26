import type { Meta, StoryObj } from '@storybook/react-webpack5'

import Zoom from '../../../components/Zoom'

import argTypes from './argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  id: 'Zoom',
  title: 'Components/Zoom',
  component: Zoom,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes,
} as Meta<typeof Zoom>

type Story = StoryObj<typeof meta>

export const ZoomStory: Story = {
  args: {
    src: 'https://images.squarespace-cdn.com/content/v1/556c9bf4e4b0de57cb590a0f/1558528954519-GMGYNRRVVRPUT77M2TC9/marvin-meyer-571072-unsplash.jpg',
    width: 120,

    // size: 'small',
    // color: 'blue',
    // title: 'Modal',
    // inverted: false,
    // loading: false,
    // closeOnClickOutside: false,
    // closeOnEsc: false,
  },
}

export default meta
