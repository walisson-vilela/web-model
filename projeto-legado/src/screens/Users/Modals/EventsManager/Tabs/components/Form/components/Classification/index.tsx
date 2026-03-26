import { useMemo } from 'react'

import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import useFormContext from '../../context'

import { useClassificationsLoader } from './loader'

const Classification = () => {
  const { form } = useFormContext()
  const { control, watch, setValue } = form

  const type = watch('type')

  const loader = useClassificationsLoader(type === 'T' ? 1 : 0)

  return (
    <div style={{ width: '100%' }}>
      <Controller
        name='classification'
        control={control}
        render={({ field: { value, ...props } }) => {
          const selectvalue = useMemo(
            () =>
              value
                ? {
                    value: value.id.toString(),
                    label: value.name,
                    data: value,
                  }
                : '',
            [value?.id],
          )

          return (
            <MwInput
              type='select'
              {...props}
              value={selectvalue}
              label='Defina o Motivo'
              placeholder='Selecione'
              loader={loader}
              setValue={(_, option) => {
                setValue(
                  props.name,
                  option
                    ? {
                        ...(option as Exclude<typeof value, null>),
                      }
                    : null,
                )
              }}
              onClear={() => setValue(props.name, null)}
              required
              search
              position='right bottom'
            />
          )
        }}
      />
    </div>
  )
}

export default Classification
