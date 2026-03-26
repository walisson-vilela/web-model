import React from 'react'

import { MwGrid } from '@mw-kit/mw-ui'

import { TRAVEL_MODE } from '../../../labels'
import useFormContext from '../../context'

import * as Inputs from './inputs'
import * as S from './styles'

const LessWalking = () => {
  const {
    form: { watch },
  } = useFormContext()

  const travel_mode = watch('travel_mode')

  return travel_mode !== TRAVEL_MODE.PUBLIC.value ? null : (
    <React.Fragment>
      <MwGrid.Row>
        <MwGrid.Col>
          <S.WarningBox>
            Uma vez escolhido o deslocamento por &quot;transporte público&quot;,
            o sistema permite intercalar este com o deslocamento feito a pé,
            caso necessário.
          </S.WarningBox>
        </MwGrid.Col>
      </MwGrid.Row>

      <MwGrid.Row>
        <MwGrid.Col>
          <Inputs.LessWalking />
        </MwGrid.Col>
      </MwGrid.Row>

      <MwGrid.Row>
        <MwGrid.Col>
          <S.WarningBox>
            Deslocamento acima do limite estabelecido, passará o cálculo a
            considerar o uso de transporte público.
          </S.WarningBox>
        </MwGrid.Col>
      </MwGrid.Row>
    </React.Fragment>
  )
}

const DisplacementParams = () => {
  const {
    form: { watch },
  } = useFormContext()
  const role = watch('role')
  const required = !role || (role && !role.internal_access)

  return (
    <S.Section>
      <MwGrid
        rows={{
          borderless: true,
        }}
        cols={{
          spacing: {
            top: 's1',
            left: 's3',
            bottom: 's1',
            right: 's3',
          },
          spacingAround: true,
        }}
        spacing={{
          top: 's3',
          left: '0',
          bottom: 's3',
          right: '0',
        }}
        borderless
      >
        <MwGrid.Row>
          <MwGrid.Col>
            <S.Title
              $marginBottom='0'
              children={
                required
                  ? 'Parâmetros do deslocamento *'
                  : 'Parâmetros do deslocamento'
              }
            />
          </MwGrid.Col>
        </MwGrid.Row>

        <MwGrid.Row>
          <MwGrid.Col>
            <Inputs.TravelMode />
          </MwGrid.Col>
        </MwGrid.Row>

        <LessWalking />
      </MwGrid>
    </S.Section>
  )
}

export default DisplacementParams
