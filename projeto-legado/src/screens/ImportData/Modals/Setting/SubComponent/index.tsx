import React, { useEffect, useState } from 'react'

import { MwInput } from '@mw-kit/mw-ui'

import { Grid } from '../../../../../components/FormFields'

import { SubComponentProps } from './interfaces'
import * as S from './styles'

const SubComponent = (props: SubComponentProps) => {
  const { title, value, options, parentValue, isSubmitted } = props
  const [selected, setSelected] = props.selected

  const [option, setOption] = useState<string | number>(null)

  useEffect(() => {
    if (option !== null) {
      setSelected((prev) => {
        let aux = { ...prev }

        aux[parentValue] = {
          [value]: option,
        }

        return aux
      })
    }
  }, [option])

  return (
    <S.Container>
      <S.Title invalid={isSubmitted && option === null}>{title}</S.Title>

      <Grid.Row>
        {options.map((value, index) => (
          <MwInput
            key={index}
            type='radio'
            name={parentValue}
            label={value.label}
            value={value.value}
            defaultChecked={
              props.value in selected[parentValue] &&
              selected[parentValue][props.value] === value.value
            }
            onChange={() => setOption(value.value)}
          />
        ))}
      </Grid.Row>
    </S.Container>
  )
}

export default SubComponent
