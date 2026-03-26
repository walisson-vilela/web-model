import React, { useEffect, useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-webpack5'

import AppliedFilters from '../../../../components/Filters/AppliedFilters'
import type { AppliedFilter } from '../../../../interfaces'

import argTypes from './argTypes'
import mock from './mock'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  id: 'AppliedFilters',
  title: 'Components/Filters/AppliedFilters',
  component: AppliedFilters,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes,
} as Meta<typeof AppliedFilters>

type Story = StoryObj<typeof meta>

export const AppliedFiltersStory: Story = {
  render: (args) => {
    const [appliedFilters, setAppliedFilters] = useState<AppliedFilter[]>([
      ...mock,
    ])

    useEffect(() => {
      console.log({ appliedFilters })
    }, [appliedFilters])

    return (
      <div style={{ position: 'relative' }}>
        <AppliedFilters
          {...args}
          appliedFilters={[appliedFilters, setAppliedFilters]}
        />
      </div>
    )
  },
}

export default meta
