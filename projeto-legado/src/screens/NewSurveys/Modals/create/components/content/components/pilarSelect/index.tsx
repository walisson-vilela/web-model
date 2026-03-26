import { useCallback } from 'react'

import { MwInput } from '@mw-kit/mw-ui'
import { Controller, useFormContext } from 'react-hook-form'
import { Form } from 'semantic-ui-react'

import { CreateSurveyFormData } from '../../../../interface'

import { getHierarchiesOptions } from './services'
import * as S from './style'

export const PilarSelect = () => {
  const methods = useFormContext<CreateSurveyFormData>()
  const loaderOptions = useCallback(async () => {
    const { data } = await getHierarchiesOptions()

    const options = data.map(({ hierarchy_type_id, name }) => ({
      label: name,
      value: hierarchy_type_id,
      data: {},
    }))

    return { options, lastPage: true }
  }, [])

  return (
    <S.Container>
      <Form.Field>
        <Controller
          control={methods.control}
          name='pilar'
          render={({ field: props }) => {
            const invalid = 'pilar' in methods.formState.errors
            const value = props.value.toString()
            return (
              <MwInput
                label='Pilar'
                type='select'
                placeholder='Selecione'
                loader={loaderOptions}
                invalid={invalid}
                setValue={(value) => {
                  methods.setValue('pilar', value, {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }}
                required
                value={value}
              />
            )
          }}
        />
      </Form.Field>
    </S.Container>
  )
}
