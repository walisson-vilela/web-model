import React from 'react'

import { MwInput } from '@mw-kit/mw-ui'

import * as S from './styles'

const Radius = (props: {
  radius: [number, React.Dispatch<React.SetStateAction<number>>]
}) => {
  const {
    radius: [radius, setRadius],
  } = props

  return (
    <React.Fragment>
      <S.Title children='Parâmetros do Raio' />

      <S.Container>
        <MwInput
          type='range'
          markers={{
            markers: [10, 25, 50, 75, 100],
            strict: true,
            position: 'top',
          }}
          label='Limite em metros'
          width='100%'
          hideNavbar
          setValue={setRadius}
          value={radius}
        />
      </S.Container>
    </React.Fragment>
  )
}

export default Radius
