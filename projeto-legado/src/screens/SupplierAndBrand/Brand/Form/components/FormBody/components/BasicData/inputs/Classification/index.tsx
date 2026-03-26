import { useCallback } from 'react'

import { MwInput } from '@mw-kit/mw-ui'
import { SelectOption } from '@mw-kit/mw-ui/types'
import { Controller } from 'react-hook-form'

import { numberOrDefault } from '../../../../../../../../../../utils/Formatters'
import { useSelectLoader } from '../../../../../../../../../../utils/hooks'
import useContext from '../../../../../../context'

const Classification = () => {
  const { form, data, isInvalid } = useContext()

  const { setValue, setValueOptions } = form

  return (
    <div>
      <Controller
        control={form.control}
        name='classification_id'
        render={({ field: { onChange, ...props } }) => {
          const value = numberOrDefault(props.value, '')

          const classificationLoader = useCallback(
            useSelectLoader({
              request: {
                url: '/v1/classifications',
                aditionalParams: {
                  limit: 200,
                  scenery_id: 12,
                  active: 1,
                },
              },
            }),
            [value],
          )

          const initialLoader = useCallback((): SelectOption[] => {
            return data?.classification
              ? [
                  {
                    label: data.classification.name,
                    data: {},
                    value: data.classification.id.toString(),
                  },
                ]
              : []
          }, [data])

          return (
            <MwInput
              {...props}
              type='select'
              label='Classificação'
              placeholder='Selecione'
              value={`${value}`}
              setValue={(value) => {
                const v = numberOrDefault(value, '')
                setValue(props.name, v, setValueOptions)
              }}
              onClear={() => {
                setValue(props.name, '', setValueOptions)
              }}
              loader={classificationLoader}
              invalid={isInvalid('classification_id')}
              initialLoader={initialLoader}
            />
          )
        }}
      />
    </div>
  )
}

export default Classification
