import { useCallback } from 'react'

import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import { ErrorMessage } from '../../../../../../../../../standardized/components/form/components'
import { notEmptyStringOrDefault } from '../../../../../../../../../utils/Formatters'
import { useSelectLoader } from '../../../../../../../../../utils/hooks'
import { useCategoriesContext } from '../../../../context'

import { parseFunction } from './functions'

const SelectParent = () => {
  const { editData, form, isInvalid } = useCategoriesContext()

  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = form

  const category = watch('category')

  return (
    <div>
      <Controller
        control={control}
        name='parent_id'
        render={({ field: props }) => {
          const loader = useCallback(
            useSelectLoader({
              request: {
                url: 'v1/tr/categories',
                aditionalParams: { level: '0,1' },
              },
              parser: parseFunction,
            }),
            [props.value, category],
          )

          return (
            <MwInput
              {...props}
              type='select'
              label={!editData ? 'Selecione o nível: ' : 'Nível Associado '}
              disabled={!!editData}
              name='parent_id'
              placeholder='Selecione'
              setValue={(e) =>
                setValue('parent_id', e, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              loader={loader}
              invalid={isInvalid('parent_id')}
              inputWidth='274px'
              value={notEmptyStringOrDefault(props.value, '')}
            />
          )
        }}
      />

      <ErrorMessage
        children={errors.parent_id ? errors.parent_id.message : undefined}
      />
    </div>
  )
}

export default SelectParent
