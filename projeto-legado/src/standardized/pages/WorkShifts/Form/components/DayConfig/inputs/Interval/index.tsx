import { useCallback } from 'react'

import { MwGrid, MwInput } from '@mw-kit/mw-ui'
import type { SelectLoader, SelectOption } from '@mw-kit/mw-ui/types'
import { Controller } from 'react-hook-form'

import useFormContext from '../../../../context'
import { InputLabel } from '../../../../style'
import { labels } from '../../labels'

const options: SelectOption[] = [
  {
    label: 'Jornada',
    value: 'false',
    data: {},
  },
  {
    label: 'Intervalo',
    value: 'true',
    data: {},
  },
]

const Interval = () => {
  const { form, auxForm, isAuxInvalid } = useFormContext()
  const { control, setValue } = auxForm

  const weekdays = form.watch('weekdays')

  const loader: SelectLoader = useCallback(async () => {
    const o: Partial<SelectOption>[] = [
      {},
      {
        rules: [
          () => {
            return weekdays.length > 0
              ? true
              : {
                  content:
                    'É preciso haver uma jornada antes de criar um intervalo.',
                }
          },
        ],
      },
    ]

    return options.map((option, i) => ({ ...option, ...(o[i] || {}) }))
  }, [weekdays])

  const clearAuxForm = () => {
    auxForm.resetField('ends_at')
    auxForm.resetField('flag')
    auxForm.resetField('name')
    auxForm.resetField('start_limit')
    auxForm.resetField('starts_at')
    auxForm.resetField('weekdays')
  }

  return (
    <MwGrid.Col width='auto'>
      <Controller
        control={control}
        name='interval'
        render={({ field: props }) => {
          const { label, required, placeholder } = labels[props.name]
          return (
            <InputLabel>
              <MwInput
                {...props}
                inputWidth='100px'
                type='select'
                label={label}
                placeholder={placeholder}
                value={options[+props.value] || ''}
                invalid={isAuxInvalid(props.name)}
                required={required}
                loader={loader}
                setValue={(value) => {
                  if (value !== 'true' && value !== 'false') return
                  if (value === props.value.toString()) return
                  setValue(props.name, value === 'true')
                  clearAuxForm()
                }}
              />
            </InputLabel>
          )
        }}
      />
    </MwGrid.Col>
  )
}

export default Interval
