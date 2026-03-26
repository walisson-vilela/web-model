import React from 'react'

import { MwInput } from '@mw-kit/mw-ui'

import * as S from './styles'

const AuditsSubtitle = (props: {
  open: [number[], React.Dispatch<React.SetStateAction<number[]>>]
  length: number
}) => {
  const {
    open: [open, setOpen],
    length,
  } = props

  return (
    <S.Container>
      <div>Exibir</div>

      {Array.from(Array(length).keys()).map((index) => {
        return (
          <MwInput
            key={index}
            type='checkbox'
            label={index + 1}
            onChange={(e) => {
              setOpen((prev) => {
                const pos = prev.findIndex((e) => e === index)
                if (e.target.checked) {
                  return pos > -1 ? prev : [...prev, index]
                }

                if (pos < 0) return prev
                const n = [...prev]
                n.splice(pos, 1)
                return n
              })
            }}
            checked={open.includes(index)}
          />
        )
      })}
    </S.Container>
  )
}

export default AuditsSubtitle
