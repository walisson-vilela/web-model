import React from 'react'

import { Name } from '../../inputs'
import type {
  StepComponent,
  StepComponentAttributes,
  StepComponentComponent,
} from '../../types'

import * as S from './styles'

const NameStep: StepComponent = Object.assign<
  StepComponentComponent,
  StepComponentAttributes
>(
  () => {
    return (
      <S.Container>
        <S.Section>
          <Name />
        </S.Section>

        <S.Alert title='Atenção'>
          Eventos do tipo Feriado Nacional, Feriado Regional e Férias Coletivas
          inativarão os usuários impactados.
        </S.Alert>
      </S.Container>
    )
  },
  {
    title: 'Defina o nome do Evento',
    validator: (value, errors) => {
      return !!(value.name && !errors.name)
    },
  },
)

export default NameStep
