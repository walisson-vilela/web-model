import React, { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-webpack5'

import Button from '../../../../components/Button'
import Modal from '../../../../components/Modal'
import argTypes, { defaultArgs } from '../argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  id: 'ConfirmEditModal',
  title: 'Components/Modal/ConfirmEditModal',
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

export const ConfirmEditModal: Story = {
  args: {
    ...defaultArgs,
  },
  render: (args) => {
    const [open, setOpen] = useState<boolean>(false)
    const [open2, setOpen2] = useState<boolean>(false)

    return (
      <React.Fragment>
        <Button content='Open modal' onClick={() => setOpen(true)} />

        <Modal.ConfirmEdit
          {...args}
          openState={[open, setOpen]}
          homeAction={() => alert('Go Home')}
          cancelAction={() => alert('Cancelar')}
          confirmAction={() => setOpen2(true)}
        />

        <Modal.ConfirmEdit
          {...args}
          openState={[open2, setOpen2]}
          homeAction={() => setOpen2(false)}
          cancelAction={() => alert('Cancelar')}
          confirmAction={() => alert('Confirmado')}
          content='teste'
        />
      </React.Fragment>
    )
  },
}

export default meta
