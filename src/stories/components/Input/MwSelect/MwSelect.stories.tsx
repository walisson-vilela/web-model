import React, { useCallback, useEffect, useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-webpack5'

import EllipsisContainer from '../../../../components/EllipsisContainer'
import Form from '../../../../components/Form'
import Icon from '../../../../components/Icon'
import Select from '../../../../components/Input/components/Select'
import type { SelectProps as SingleSelectProps } from '../../../../components/Input/components/Select/hooks/Select/interfaces'
import type {
  SelectLoader,
  SelectOption,
} from '../../../../components/Input/components/Select/interfaces'
import { getStarWars } from '../../../../services'

import argTypes from './argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  id: 'MwSelect',
  title: 'Components/Input/type="select"',
  component: Select as React.FunctionComponent<SingleSelectProps>,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes,
} as Meta<React.FunctionComponent<SingleSelectProps>>

type Story = StoryObj<typeof meta>

const initial = {
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
}

export const MwSelect: Story = {
  args: {
    label: 'Label',
    name: 'name',
    placeholder: 'Selecione',
    required: false,
    disabled: false,
    invalid: false,
    loading: false,
    search: true,
  },
  render: (args) => {
    const [value, setValue] = useState<typeof initial | ''>({ ...initial })
    const [teste, setTeste] = useState<boolean>(false)

    const loader: SelectLoader = useCallback(
      async (search, page) => {
        console.log({ teste, search, page })
        const responseData = await getStarWars(search, page)

        // setando se a pagina atual e a ultima
        const lastPage = !responseData.next
        // pegando os resultados da requisicao
        const results = responseData.results || []

        return {
          options: results.map((e) => {
            const disabled = e.name.length === 5

            return {
              label: (props) => {
                return (
                  <React.Fragment>
                    <Icon type='feather' icon='truck' width='14px' />
                    <EllipsisContainer>
                      {props.data.name}
                      {props.mode === 'placeholder' &&
                        ` (${props.data.gender})`}
                    </EllipsisContainer>
                  </React.Fragment>
                )
              },
              value: e.url.split('/').slice(-2)[0],
              data: e,
              disabled,
            } as SelectOption<{ name: string; gender: string }>
          }),
          lastPage,
        }
      },
      [value, teste],
    )

    useEffect(() => {
      console.log(value)
    }, [value])

    const initialLoader = useCallback((): SelectOption[] => {
      return [
        {
          label: initial.name,
          data: initial,
          value: initial.url.split('/').slice(-2)[0],
        },
      ]
    }, [initial])

    return (
      <Form>
        <button
          type='button'
          onClick={() => setTeste((prev) => !prev)}
          style={{ marginBottom: '21px' }}
        >
          reload options
        </button>

        <Select
          {...args}
          type='select'
          label='Personagem de Star Wars'
          value={
            value
              ? {
                  label: value.name,
                  data: value,
                  value: value.url.split('/').slice(-2)[0],
                }
              : ''
          }
          setValue={(value, option) => {
            console.log({ value, option })
            setValue(value ? (option as typeof initial) : '')
          }}
          onClear={setValue}
          inputWidth='220px'
          loader={loader}
          dirty={{
            data: initial,
            value: initial.url.split('/').slice(-2)[0],
          }}
          initialLoader={initialLoader}
        />
      </Form>
    )
  },
}

export default meta
