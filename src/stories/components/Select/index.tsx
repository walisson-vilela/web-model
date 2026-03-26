import React, { useState } from 'react'

import styled from 'styled-components'

import { isObject } from '../../../functions/common'
import { MwEllipsisContainer, MwSelect } from '../../../index'
import type {
  SelectKeyBuilder,
  SelectOptionComponent,
  SelectOptionsFinder,
  SelectOptionsLoader,
  SelectRules,
} from '../../../interfaces'
import { getStarWars } from '../../../services'

export type Option = {
  id: string
  name: string
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
  homeworld: string
  films: string[]
  species: string[]
  vehicles: string[]
  starships: string[]
  created: string
  edited: string
  url: string
}

export const loader: SelectOptionsLoader<Option> = async (search, page) => {
  const responseData = await getStarWars(search, page)

  const last = !responseData.next
  const options = (
    (Array.isArray(responseData.results)
      ? responseData.results
      : []) as unknown[]
  ).reduce<Option[]>((options, e) => {
    if (!isObject<Record<string, unknown>>(e) || typeof e.url !== 'string') {
      return options
    }

    const parsed: Option = {
      id: e.url.split('/').slice(-2)[0],
      name: typeof e.name === 'string' ? e.name : '',
      height: typeof e.height === 'string' ? e.height : '',
      mass: typeof e.mass === 'string' ? e.mass : '',
      hair_color: typeof e.hair_color === 'string' ? e.hair_color : '',
      skin_color: typeof e.skin_color === 'string' ? e.skin_color : '',
      eye_color: typeof e.eye_color === 'string' ? e.eye_color : '',
      birth_year: typeof e.birth_year === 'string' ? e.birth_year : '',
      gender: typeof e.gender === 'string' ? e.gender : '',
      homeworld: typeof e.homeworld === 'string' ? e.homeworld : '',
      films: (Array.isArray(e.films) ? e.films : []).filter(
        (e) => typeof e === 'string',
      ),
      species: (Array.isArray(e.species) ? e.species : []).filter(
        (e) => typeof e === 'string',
      ),
      vehicles: (Array.isArray(e.vehicles) ? e.vehicles : []).filter(
        (e) => typeof e === 'string',
      ),
      starships: (Array.isArray(e.starships) ? e.starships : []).filter(
        (e) => typeof e === 'string',
      ),
      created: typeof e.created === 'string' ? e.created : '',
      edited: typeof e.edited === 'string' ? e.edited : '',
      url: e.url,
    }

    options.push(parsed)

    return options
  }, [])

  return {
    options,
    last,
  }
}

export const finder: SelectOptionsFinder<Option> = (search, options) =>
  options.filter((o) =>
    o.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
  )

export const getKey: SelectKeyBuilder<Option> = (option) => option.id.toString()

export const OptionComponent: SelectOptionComponent<Option> = ({ option }) => {
  return (
    <MwSelect.OptionContainer>
      <div>
        <span>ID:</span>
        <MwEllipsisContainer>
          <span>{option.id}</span>
        </MwEllipsisContainer>

        <span children='|' />

        <span>Nome:</span>
        <MwEllipsisContainer>
          <span>{option.name}</span>
        </MwEllipsisContainer>
      </div>

      <div>
        <span>Born in:</span>
        <MwEllipsisContainer>
          <span>{option.birth_year}</span>
        </MwEllipsisContainer>

        <span children='|' />

        <span>Height:</span>
        <MwEllipsisContainer>
          <span>{option.height}</span>
        </MwEllipsisContainer>

        <span children='|' />

        <span>Hair:</span>
        <MwEllipsisContainer>
          <span>{option.hair_color}</span>
        </MwEllipsisContainer>
      </div>
    </MwSelect.OptionContainer>
  )
}

export const ValueComponent: SelectOptionComponent<Option> = ({ option }) => {
  return (
    <React.Fragment>
      {option.id} | {option.name}
    </React.Fragment>
  )
}

export const rules: SelectRules<Option> = [
  {
    id: 'female',
    allow: (option) => option.hair_color !== 'n/a',
    Component: () => (
      <React.Fragment>
        <p>O personagem deve ter:</p>
        <b>cabelo</b>
      </React.Fragment>
    ),
  },
]

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 14px;

  #storybook-root & {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
  }

  #storybook-docs & {
    width: 100%;
    min-height: 300px;
  }
`

export const StoryWrapper = ({ children }: React.PropsWithChildren) => {
  const [style, setStyle] = useState({
    width: 300,
    alignItems: 'top' as 'start' | 'center' | 'end',
    justifyContent: 'center' as 'start' | 'center' | 'end',
  })

  const [width, setWidth] = useState(style.width.toString())

  return (
    <Container>
      <div
        style={{
          display: 'flex',
          marginBottom: 14,
          gap: 14,
          justifyContent: 'center',
        }}
      >
        <input
          type='number'
          value={width}
          onChange={(e) => {
            setWidth(e.target.value)
          }}
          onBlur={() => {
            const w = parseInt(width)
            if (!isNaN(w)) {
              setStyle((prev) => ({ ...prev, width: w }))
              setWidth(w.toString())
            } else {
              setWidth(style.width.toString())
            }
          }}
        />

        <select
          onChange={(e) =>
            ['start', 'center', 'end'].includes(e.target.value) &&
            setStyle((prev) => ({
              ...prev,
              alignItems: e.target.value as typeof prev.alignItems,
            }))
          }
          value={style.alignItems}
        >
          <option value='start'>top</option>
          <option value='center'>center</option>
          <option value='end'>bottom</option>
        </select>

        <select
          onChange={(e) =>
            ['start', 'center', 'end'].includes(e.target.value) &&
            setStyle((prev) => ({
              ...prev,
              justifyContent: e.target.value as typeof prev.justifyContent,
            }))
          }
          value={style.justifyContent}
        >
          <option value='start'>left</option>
          <option value='center'>center</option>
          <option value='end'>right</option>
        </select>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: style.alignItems,
          justifyContent: style.justifyContent,
          flex: 1,
        }}
      >
        <div style={{ width: style.width }} children={children} />
      </div>
    </Container>
  )
}
