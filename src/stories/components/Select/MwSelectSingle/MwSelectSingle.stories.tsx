import type { Option } from '..'
import {
  OptionComponent,
  StoryWrapper,
  ValueComponent,
  getKey,
  loader,
  rules,
} from '..'

import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-webpack5'

import { MwSelect } from '../../../../components'
import type { SelectSingleProps } from '../../../../interfaces'
import argTypes from '../argTypes'

type SelectComponent = React.FunctionComponent<SelectSingleProps<Option>>

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  id: 'MwSelectSingle',
  title: 'Components/Select/Single',
  component: MwSelect as never as SelectComponent,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes,
} as Meta<SelectComponent>

type Story = StoryObj<typeof meta>

export const MwSelectSingle: Story = {
  args: {
    label: 'Personagem de Star Wars',
    placeholder: 'Selecione o personagem',
    clearable: true,
    rules,
  },
  render: (args) => {
    const [value, setValue] = useState<Option | null>(null)

    return (
      <StoryWrapper>
        <MwSelect
          type='single-select'
          {...(args as SelectSingleProps<Option>)}
          loader={loader}
          getKey={getKey}
          OptionComponent={OptionComponent}
          ValueComponent={ValueComponent}
          value={value}
          setValue={setValue}
        />
      </StoryWrapper>
    )
  },
}

export default meta
