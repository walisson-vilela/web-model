import React, { useState } from 'react'

import { MwScrollContainer } from '@mw-kit/mw-ui'

import { generateKey } from '../../../../../../utils/Generate'
import { useMainContext, useTabContext } from '../../contexts'
import { useScrollMonth } from '../../hooks'

import { Accordion } from './components'
import { Context } from './context'
import * as S from './styles'
import type { GridProps } from './types'

const Grid = (props: GridProps) => {
  const {
    month: [month],
  } = useMainContext()

  const {
    data: [data],
  } = useTabContext()

  const [open, setOpen] = useState(month === null ? [] : [month])

  return (
    <MwScrollContainer style={{ scrollBehavior: 'smooth' }}>
      <S.Container ref={useScrollMonth(month || 0, 1, [data])}>
        <Context.Provider
          value={{
            getCardMenu: props.getCardMenu || (() => ({ options: [] })),
          }}
        >
          {data.map((accordion, index) => {
            const accordionOpen = open.includes(accordion.id)
            const setAccordionOpen: React.Dispatch<
              React.SetStateAction<boolean>
            > = (value) => {
              setOpen((prev) => {
                const idx = prev.findIndex((x) => x === accordion.id)
                const cur = idx > -1

                const v = typeof value === 'boolean' ? value : value(cur)

                if (v === cur) return prev

                if (v) {
                  return [...prev, accordion.id]
                }

                const n = [...prev]
                n.splice(idx, 1)

                return n
              })
            }

            return (
              <Accordion
                open={[accordionOpen, setAccordionOpen]}
                key={generateKey(index)}
                data={accordion}
              />
            )
          })}
        </Context.Provider>
      </S.Container>
    </MwScrollContainer>
  )
}

export default Grid
