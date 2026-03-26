import { useCallback } from 'react'

import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import { numberOrDefault } from '../../../../../../../../../../utils/Formatters'
import { useSelectLoader } from '../../../../../../../../../../utils/hooks'
import useContext from '../../../../../../context'

const SupplierSelect = () => {
  const { form, isInvalid } = useContext()

  const { watch, setValue, setValueOptions } = form

  return (
    <div>
      <Controller
        control={form.control}
        name='supplier_id'
        render={({ field: { ...props } }) => {
          const type = watch('type')

          const supplierLoader = useCallback(
            useSelectLoader({
              request: {
                url: '/v1/tr/suppliers',
                aditionalParams: {
                  type,
                },
              },
            }),
            [type],
          )

          return (
            <MwInput
              {...props}
              type='select'
              label='Fabricante'
              required
              placeholder='Selecione'
              invalid={isInvalid('supplier_id')}
              setValue={(value) =>
                setValue(
                  'supplier_id',
                  numberOrDefault(value, ''),
                  setValueOptions,
                )
              }
              value={`${props.value}`}
              loader={supplierLoader}
            />
          )
        }}
      />
    </div>
  )
}

export default SupplierSelect
