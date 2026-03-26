import { useCallback } from 'react'

import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import useAddessContext from '../../../../context'

const StreetNumber = () => {
  const { form, loadCoordinates, invalidCheck, disabled, showTitle } =
    useAddessContext()

  const { control, getValues, setValue, setValueOptions } = form

  const onChangeNumber = useCallback(
    (street_number: string) => {
      loadCoordinates({
        ...getValues(),
        street_number,
      })
    },
    [loadCoordinates, getValues],
  )

  return (
    <Controller
      control={control}
      name='street_number'
      render={({ field: props }) => (
        <MwInput
          {...props}
          type='text'
          label={showTitle ? 'Número' : ''}
          required
          mask={[/\D/g, '']}
          placeholder='Nº'
          invalid={invalidCheck(props.name)}
          disabled={disabled}
          onChange={(e) => {
            props.onChange(e)
            onChangeNumber(e.target.value)
            setValue('street_number', e.target.value, setValueOptions)
          }}
        />
      )}
    />
  )
}

export default StreetNumber
