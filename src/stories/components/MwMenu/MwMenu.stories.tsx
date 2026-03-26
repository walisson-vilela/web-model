import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-webpack5'

import Menu from '../../../components/Menu'
import type { Option } from '../../../components/Menu/interfaces'

import argTypes from './argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  id: 'Menu',
  title: 'Components/Menu',
  component: Menu,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes,
} as Meta<typeof Menu>

type Story = StoryObj<typeof meta>

export const MenuStory: Story = {
  args: {
    bordered: true,
    containerSpacing: {
      top: 's1',
      left: 's3',
      bottom: 's1',
    },
    scrollSpacing: {
      top: 's1',
      bottom: 's1',
    },
    itemSpacing: 's1',
    before: '',
    after: '',
    onScrollEnd: () => console.log('scrollEnd'),
    width: '160px',
    close: () => console.log('close'),
  },
  render: (args) => {
    const [open, setOpen] = useState(true)

    const options: Option[] = Array(10)
      .fill(1)
      .map((_v, index) => {
        const i = index + 1

        const option: Option = {
          label: `Item ${i}`,
          onClick: (e, data) => {
            console.log('option clicked', { e, data })
          },
          data: {
            i: i,
          },
          rules: [
            () =>
              i % 3 === 0 ? true : { content: 'O item deve ser multiplo de 3' },
          ],
        }

        return option
      })

    return (
      <div
        style={{
          position: 'relative',
          margin: '30vh 30vw',
          display: 'inline-block',
          border: '1px solid black',
          padding: '7px',
        }}
      >
        <div
          onClick={() => setOpen((prev) => !prev)}
          style={{ cursor: 'pointer' }}
        >
          &times;
        </div>
        <Menu {...args} open={open} options={options} />
      </div>
    )
  },
}

export default meta
