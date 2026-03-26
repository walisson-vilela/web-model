import React, { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-webpack5'

import Form from '../../../../components/Form'
import Select from '../../../../components/Input/components/Select'
import type { SelectProps as MultiSelectProps } from '../../../../components/Input/components/Select/hooks/SelectMultiple/interfaces'
import type {
  SelectLoader,
  SelectOption,
} from '../../../../components/Input/components/Select/interfaces'
import { getStarWars } from '../../../../services'

import argTypes from './argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  id: 'SelectMultiple',
  title: 'Components/Input/type="select-multiple"',
  component: Select as React.FunctionComponent<MultiSelectProps>,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes,
} as Meta<React.FunctionComponent<MultiSelectProps>>

type Story = StoryObj<typeof meta>

const initial = [
  {
    name: 'Wilhuff Tarkin',
    height: '180',
    mass: 'unknown',
    hair_color: 'auburn, grey',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '64BBY',
    gender: 'male',
    homeworld: 'https://swapi.py4e.com/api/planets/21/',
    films: [
      'https://swapi.py4e.com/api/films/1/',
      'https://swapi.py4e.com/api/films/6/',
    ],
    species: ['https://swapi.py4e.com/api/species/1/'],
    vehicles: [],
    starships: [],
    created: '2014-12-10T16:26:56.138000Z',
    edited: '2014-12-20T21:17:50.330000Z',
    url: 'https://swapi.py4e.com/api/people/12/',
  },
]

const loader: SelectLoader = async (search, page) => {
  const responseData = await getStarWars(search, page)

  // setando se a pagina atual e a ultima
  const lastPage = !responseData.next
  // pegando os resultados da requisicao
  const results = responseData.results || []

  return {
    options: results.map(
      (e: (typeof initial)[number]) =>
        ({
          label: e.name,
          value: e.url.split('/').slice(-2)[0],
          data: e,
          onClick: (...args) => console.log('click', args),
          rules: [
            (i: number) => {
              if (i === 0 || i % 5 !== 0) return true
              return {
                content: 'O indice é divisor de 5.',
              }
            },
          ],
        } as SelectOption),
    ),
    lastPage,
  }
}

export const SelectMultiple: Story = {
  args: {
    label: 'Label',
    name: 'name',
    placeholder: 'Selecione',
    required: false,
    disabled: false,
    invalid: false,
    selectAll: true,
    loading: false,
    search: true,
    minSelected: undefined,
    maxSelected: undefined,
  },
  render: (args) => {
    const [value, setValue] = useState(initial)

    const normalizeLimit = (
      limit: number | null | undefined,
    ): number | undefined => {
      if (limit === null || limit === undefined) return undefined
      if (typeof limit === 'number' && !Number.isNaN(limit) && limit >= 0) {
        return limit
      }
      return undefined
    }

    const minSelected = normalizeLimit(args.minSelected)
    const maxSelected = normalizeLimit(args.maxSelected)

    return (
      <Form>
        <Select
          {...args}
          type='select-multiple'
          minSelected={minSelected}
          maxSelected={maxSelected}
          value={value.map((data) => ({
            label: data.name,
            data,
            value: data.url.split('/').slice(-2)[0],
          }))}
          setValue={(value, data) => {
            console.log({ value, data })
            setValue(data as never as typeof initial)
          }}
          loader={loader}
          dirty={initial.map((data) => ({
            data,
            value: data.url.split('/').slice(-2)[0],
          }))}
        />
      </Form>
    )
  },
}

export default meta
