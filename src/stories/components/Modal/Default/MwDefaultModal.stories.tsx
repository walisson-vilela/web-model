import React, { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-webpack5'

import Button from '../../../../components/Button'
import Modal from '../../../../components/Modal'
import argTypes, { defaultArgs } from '../argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  id: 'DefaultModal',
  title: 'Components/Modal/DefaultModal',
  component: Modal.Audit,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes,
} as Meta<typeof Modal.Audit>

type Story = StoryObj<typeof meta>

export const DefaultModal: Story = {
  args: {
    ...defaultArgs,
  },
  render: (args) => {
    const [open, setOpen] = useState<boolean>(false)

    return (
      <React.Fragment>
        <Button content='Open modal' onClick={() => setOpen(true)} />

        <Modal {...args} openState={[open, setOpen]} />
      </React.Fragment>
    )
  },
}

export default meta
