import { MwGrid, MwInput } from '@mw-kit/mw-ui'
import type { SelectOption } from '@mw-kit/mw-ui/types'
import { Controller } from 'react-hook-form'

import { WeekDays } from '../../../../constants'
import useFormContext from '../../../../context'
import type { MainForm } from '../../../../interfaces'
import { InputLabel } from '../../../../style'
import { labels } from '../../labels'

const loader = async (
  interval: boolean,
  weekdays: MainForm['weekdays'],
): Promise<SelectOption[]> => {
  const options: SelectOption[] = WeekDays.map((el) => {
    if (!interval) {
      return {
        ...el,
        data: {},
      }
    }

    return {
      ...el,
      data: {},
      rules: [
        () => {
          return weekdays.find((w) => w.weekday === Number(el.value))
            ? true
            : {
                content: 'Dias sem jornada não pode ter intervalo.',
              }
        },
      ],
    }
  })

  return options
}

const Frequency = () => {
  const { auxForm, form, isAuxInvalid } = useFormContext()
  const { control, setValue } = auxForm
  const weekdays = form.getValues('weekdays')
  const interval = auxForm.getValues('interval')

  return (
    <MwGrid.Col width='auto'>
      <Controller
        control={control}
        name='weekdays'
        render={({ field: props }) => {
          const { label, required, placeholder } = labels[props.name]
          return (
            <InputLabel>
              <MwInput
                {...props}
                type='select-multiple'
                position='right bottom'
                inputWidth='240px'
                label={label}
                placeholder={placeholder}
                value={props.value?.map((el) => el.toString()) || ''}
                invalid={isAuxInvalid(props.name)}
                required={required}
                search
                selectAll
                loader={() => loader(interval, weekdays)}
                setValue={(value) => {
                  setValue(
                    props.name,
                    value?.map((v) => Number(v)),
                  )
                }}
              />
            </InputLabel>
          )
        }}
      />
    </MwGrid.Col>
  )
}

export default Frequency
