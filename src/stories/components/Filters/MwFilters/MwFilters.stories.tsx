import React, { useEffect, useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-webpack5'

import Filters from '../../../../components/Filters/Filters'
import type {
  Filter,
  Option,
} from '../../../../components/Filters/Filters/interfaces'
import type { AppliedFilter } from '../../../../components/Filters/interfaces'
import { getStarWars } from '../../../../services'

import argTypes from './argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  id: 'Filters',
  title: 'Components/Filters/Filters',
  component: Filters,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes,
} as Meta<typeof Filters>

type Story = StoryObj<typeof meta>

export const FiltersStory: Story = {
  args: {
    items: Array(10)
      .fill(1)
      .map<Filter>((_v, index) => {
        const i = index + 1

        if (index === 0) {
          return {
            label: 'Personagem de Star Wars',
            name: 'star_wars_person',
            allowEmptySearch: true,
            delimiter: true,
            options: async (search, page) => {
              const responseData = await getStarWars(search, page)

              // setando se a pagina atual e a ultima
              const lastPage = !responseData.next
              // pegando os resultados da requisicao
              const results = (responseData.results || []) as {
                name: string
                url: string
              }[]

              return {
                options: results.map<Option>((e) => ({
                  label: e.name,
                  value: e.url,
                })),
                lastPage,
              }
            },
          }
        }

        return {
          label: `Item ${i}`,
          name: `item_${i}`,
          options: Array(10)
            .fill(1)
            .map((v, index) => {
              const j = index + 1
              return {
                label: `Subtem - ${i}.${j}`,
                value: j,
              }
            }),
        }
      }),
  },
  render: (args) => {
    const [appliedFilters, setAppliedFilters] = useState<AppliedFilter[]>([])

    useEffect(() => {
      console.log({ appliedFilters })
    }, [appliedFilters])

    return (
      <div style={{ position: 'relative' }}>
        <Filters {...args} setAppliedFilters={setAppliedFilters} />
      </div>
    )
  },
}

export default meta
