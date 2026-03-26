import { MwInput } from '@mw-kit/mw-ui'
import { Controller, useFormContext } from 'react-hook-form'

import { Response } from '../../../../../../../../utils/hooks/useEndpointValidation/interfaces'
import { CreateSurveyFormData } from '../../../../interface'

import * as S from './style'

interface SimpleTextProps {
  checkInput: Response
}

export const SimpleText = ({ checkInput }: SimpleTextProps) => {
  const methods = useFormContext<CreateSurveyFormData>()

  return (
    <S.Container>
      <Controller
        name='name'
        render={({ field: props }) => {
          const invalid = 'name' in methods.formState.errors
          return (
            <MwInput
              {...props}
              type='text'
              invalid={invalid}
              placeholder='Ex: Pesquisa de Preço MG'
              loading={checkInput.loading}
              disabled={!methods.watch('pilar')}
              label='Nome'
              required
            />
          )
        }}
      />
      <S.ErrorMessage children={checkInput.message} />
    </S.Container>
  )
}
