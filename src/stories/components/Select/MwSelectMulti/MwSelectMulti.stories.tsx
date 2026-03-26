import type { Option } from '..'
import {
  OptionComponent,
  StoryWrapper,
  finder,
  getKey,
  loader,
  rules,
} from '..'

import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-webpack5'

import { Select } from '../../../../components'
import type { SelectMultiProps } from '../../../../interfaces'
import argTypes from '../argTypes'

type SelectComponent = React.FunctionComponent<SelectMultiProps<Option>>

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  id: 'SelectMulti',
  title: 'Components/Select/Multi',
  component: Select as never as SelectComponent,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    ...argTypes,

    applyRules: {
      description: 'List of rules to enable the apply button.',
    },

    finder: {
      description:
        'Callback used to apply a local search when toggling the "selected" switch.',
    },
  },
} as Meta<SelectComponent>

type Story = StoryObj<typeof meta>

export const SelectMulti: Story = {
  args: {
    label: 'Personagem de Star Wars',
    placeholder: 'Selecione os personagens',
    clearable: true,
    finder,
    rules,
    applyRules: [
      {
        id: 'min',
        allow: (value) => value.length >= 2,
        Component: () => 'Selecione pelo menos 2 personagens',
      },
      {
        id: 'max',
        allow: (value) => value.length <= 4,
        Component: () => 'Selecione até 4 personagens',
      },
    ],
  },
  render: (args) => {
    const [value, setValue] = useState<Option[]>([])

    return (
      <StoryWrapper>
        <Select
          type='multi-select'
          {...(args as SelectMultiProps<Option>)}
          loader={loader}
          finder={finder}
          getKey={getKey}
          OptionComponent={OptionComponent}
          rules={rules}
          value={value}
          setValue={setValue}
        />
      </StoryWrapper>
    )
  },
}

export default meta
