import { useCallback } from 'react'

import { MwGrid, MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../utils/Formatters'
import { useSelectLoader } from '../../../../../../../utils/hooks'
import useContext from '../../../../context'

const Brands = () => {
  const { form, setValueOptions, isInvalid, data } = useContext()

  const { watch, setValue, control } = form

  return (
    <MwGrid.Col>
      <Controller
        control={control}
        name='brand_id'
        render={({ field: props }) => {
          const type = watch('type')

          const brandLoader = useCallback(
            useSelectLoader({
              request: {
                url: 'v1/tr/brands/options',
                aditionalParams: {
                  type,
                },
              },
            }),
            [props.value, type],
          )
          return (
            <MwInput
              {...props}
              width='100%'
              type='select'
              required
              placeholder='Selecione'
              label='Marca'
              invalid={isInvalid(props.name)}
              value={notEmptyStringOrDefault(props.value, '')}
              setValue={(e) => {
                setValue('brand_id', numberOrDefault(e), setValueOptions)
              }}
              loader={brandLoader}
              onClear={() => {
                setValue('brand_id', null, setValueOptions)
              }}
            />
          )
        }}
      />
    </MwGrid.Col>
  )
}

export default Brands
