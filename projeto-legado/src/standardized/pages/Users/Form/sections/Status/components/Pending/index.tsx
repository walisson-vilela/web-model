import React from 'react'

import { MwGrid } from '@mw-kit/mw-ui'

import Info from '../Info'
import * as S from '../styles'

const Pending = () => {
  return (
    <React.Fragment>
      <MwGrid.Row>
        <S.Col>
          <div>
            Esse usuário encontra-se <b>Inativo</b> - Motivo:{' '}
            <b>Informações cadastrais pendentes</b>
          </div>
        </S.Col>
      </MwGrid.Row>

      <Info />
    </React.Fragment>
  )
}

export default Pending
