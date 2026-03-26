import { useCallback } from 'react'

import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../utils/Formatters'
import { useSelectLoader } from '../../../../../../../utils/hooks'
import useContext from '../../../../context'

const Classification = () => {
  const { form, isInvalid, setValueOptions } = useContext()

  const { setValue, control } = form

  return (
    <Controller
      control={control}
      name='classification_id'
      render={({ field: props }) => {
        const loader = useCallback(
          useSelectLoader({
            request: {
              url: 'v1/classifications',
              aditionalParams: {
                limit: 200,
                scenery_id: 13,
                active: 1,
              },
            },
          }),
          [props.value],
        )

        return (
          <MwInput
            {...props}
            type='select'
            placeholder='Selecione'
            label='Classificação'
            invalid={isInvalid(props.name)}
            value={notEmptyStringOrDefault(props.value, '')}
            setValue={(value) =>
              setValue(props.name, numberOrDefault(value), setValueOptions)
            }
            onClear={() => setValue(props.name, null, setValueOptions)}
            loader={loader}
          />
        )
      }}
    />
  )
}

export default Classification
