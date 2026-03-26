import { Form, MwInput } from '@mw-kit/mw-ui'
import { Controller, useFormContext } from 'react-hook-form'

import { CreateSurveyFormData } from '../../../../interface'

import { selectOptions } from './options'
import * as S from './style'

interface props {
  type: keyof CreateSurveyFormData
}

export const SimpleSelect = ({ type }: props) => {
  const methods = useFormContext<CreateSurveyFormData>()

  const getOption = selectOptions.find((e) => e.type === type)

  const parseOption = getOption.options.map(({ text, value }) => ({
    label: text,
    value,
    data: {},
  }))

  return (
    <S.Container>
      <Form.Field>
        <Controller
          name={type}
          control={methods.control}
          render={({ field: props }) => {
            const invalid = type in methods.formState.errors

            return (
              <MwInput
                {...props}
                label={getOption.title}
                type='select'
                placeholder='Selecione'
                loader={async () => ({
                  options: parseOption,
                  lastPage: true,
                })}
                setValue={(value) => {
                  methods.setValue(type, value, {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }}
                required
                invalid={invalid}
                value={props.value.toString()}
                loading={parseOption.length === 0}
                disabled={type !== 'pilar' && !methods.watch('pilar')}
                position='left bottom'
              />
            )
          }}
        />
      </Form.Field>
    </S.Container>
  )
}
