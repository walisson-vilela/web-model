import React from 'react'

import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import { numberOrDefault } from '../../../../../../../../../utils/Formatters'
import { defaultCoordinates } from '../../../../constants'
import { useWithFormContext } from '../../context'

import * as S from './styled'

const RadiusParameter = () => {
  const { form, fieldIsInvalid, setValue } = useWithFormContext()

  return (
    <React.Fragment>
      <S.TitleParameterRadius>Parâmetros do Raio</S.TitleParameterRadius>

      <S.InputContainer>
        {' '}
        <Controller
          name='radius'
          control={form.control}
          render={({ field: props }) => {
            const { onChange, ...restProps } = props
            const removeProp = { ...restProps }

            return (
              <MwInput
                {...removeProp}
                value={numberOrDefault(props.value, defaultCoordinates.radius)}
                setValue={(v) => {
                  setValue(
                    props.name as 'radius',
                    typeof v === 'function' ? v(props.value || 10) : v,
                  )
                }}
                type='range'
                markers={{
                  markers: [10, 25, 50, 75, 100],
                  strict: true,
                  position: 'top',
                }}
                label='Limite em metros'
                invalid={fieldIsInvalid(props.name as 'radius')}
                width='100%'
                hideNavbar
              />
            )
          }}
        />
      </S.InputContainer>
    </React.Fragment>
  )
}

export default RadiusParameter
