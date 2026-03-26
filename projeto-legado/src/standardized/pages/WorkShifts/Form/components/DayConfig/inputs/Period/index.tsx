import React, { useEffect, useMemo } from 'react'

import { MwGrid, MwInput } from '@mw-kit/mw-ui'
import moment from 'moment'
import { Controller } from 'react-hook-form'

import { useHookFormsAsState } from '../../../../../../../../utils/hooks'
import useFormContext from '../../../../context'
import { checkValidIntervalTime, getMinMaxWeekDays } from '../../../../services'
import { InputLabel } from '../../../../style'
import { labels } from '../../labels'

const comparisons: {
  [K in 'starts_at' | 'ends_at']: (startLimit: Date, value: Date) => boolean
} = {
  starts_at: (startLimit, value) => startLimit.getTime() < value.getTime(),
  ends_at: (startLimit, value) => startLimit.getTime() > value.getTime(),
}

const Period = (props: { name: 'starts_at' | 'ends_at' }) => {
  const { name } = props

  const {
    form,
    auxForm,
    isAuxInvalid,
    modal: [, setModal],
    errors: [, setErrors],
  } = useFormContext()
  const { control, setValue } = auxForm

  const { interval, starts_at, ends_at, weekdays, start_limit } =
    auxForm.getValues()
  const [formWeekdays] = useHookFormsAsState('weekdays', form)
  const { min, max } = getMinMaxWeekDays(formWeekdays)

  const { valid, errors } = useMemo(() => {
    return checkValidIntervalTime(
      interval,
      starts_at,
      ends_at,
      formWeekdays,
      weekdays,
    )
  }, [interval, starts_at, ends_at, formWeekdays, weekdays])

  useEffect(() => {
    if (errors.starts_at || errors.ends_at) {
      setErrors((prev) => ({
        ...prev,
        ...errors,
      }))
    } else {
      setErrors((prev) => {
        let content = { ...prev }

        if (prev.starts_at) {
          const { starts_at, ...rest } = content
          content = rest
        }

        if (prev.ends_at) {
          const { ends_at, ...rest } = content
          content = rest
        }

        return content
      })
    }
  }, [errors, setErrors])

  const checkTime = () => {
    if (valid) return

    let message = (
      <p>
        A hora de término não pode ser inferior a hora de início da Jornada.
        Corrija os campos destacados em vermelho para prosseguir.
      </p>
    )

    if (interval) {
      message = (
        <p>
          Não podem haver intervalos menores que 1 hora e maiores que 2 horas em
          jornadas que sejam maiores que 4 horas.
        </p>
      )
    }

    if (
      [errors?.ends_at?.code || '', errors?.ends_at?.code || ''].includes(
        'INVALID_BOUNDARIES',
      )
    ) {
      message = (
        <React.Fragment>
          <span>
            Não pode haver intervalo antes ou após o horário da jornada.
          </span>
          <span>Corrija os campos destacados em vermelho para prosseguir.</span>
        </React.Fragment>
      )
    }

    setModal({
      title: 'Notificação',
      content: message,
      buttonType: 'MwButton',
      actions: [
        {
          content: 'Ok',
          onClick: () => setModal(null),
        },
      ],
    })
  }

  return (
    <MwGrid.Col width='auto'>
      <Controller
        control={control}
        name={name}
        render={({ field: props }) => {
          const { label, required, placeholder } = labels[props.name]

          return (
            <InputLabel>
              <MwInput
                {...props}
                inputWidth='92px'
                type='time'
                label={label}
                placeholder={placeholder}
                min={interval ? min.format('HH:mm') : undefined}
                max={interval ? max.format('HH:mm') : undefined}
                value={props.value || ''}
                invalid={isAuxInvalid(props.name) || !valid}
                required={required}
                setValue={(value) => {
                  setValue(props.name, value)

                  const v = moment(value, 'HH:mm', true)
                  if (!v.isValid()) return

                  const sl = moment(start_limit, 'HH:mm', true)
                  const compare = comparisons[name]
                  if (!sl.isValid() || compare(sl.toDate(), v.toDate())) {
                    setValue('start_limit', value)
                  }
                }}
                onBlur={checkTime}
                icon={{
                  icon: {
                    type: 'feather',
                    icon: 'clock',
                  },
                }}
              />
            </InputLabel>
          )
        }}
      />
    </MwGrid.Col>
  )
}

export default Period
