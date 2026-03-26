import { useCallback } from 'react'

import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import { numberOrDefault } from '../../../../../../../../../utils/Formatters'
import { useSelectLoader } from '../../../../../../../../../utils/hooks'
import useContext from '../../../../context'
import labels from '../../../../labels'

const name = 'occupationArea'

const OccupationArea = () => {
  const {
    form: { control, setValue, setValueOptions, isInvalid },
  } = useContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: props }) => {
        const { value } = props

        const loader = useCallback(
          useSelectLoader({
            request: {
              url: '/v1/region-countries',
            },
          }),
          [value],
        )

        return (
          <MwInput
            {...{
              ...props,
              type: 'select-multiple',
              label: labels[name].label,
              placeholder: labels[name].placeholder,
              required: labels[name].required,
              setValue: (value) => {
                setValue(
                  name,
                  value.reduce((elements, element) => {
                    const number = numberOrDefault(element)
                    return number === null ? elements : [...elements, number]
                  }, [] as number[]),
                  setValueOptions,
                )
              },
              value: Array.isArray(value)
                ? (value as number[]).map((v) => v.toString())
                : [],
              loader,
              invalid: isInvalid(name),
              search: true,
              width: '100%',
              center: { x: 50, y: 75 },
            }}
          />
        )
      }}
    />
  )
}

export default OccupationArea
