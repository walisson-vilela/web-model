import { MwGrid, MwInput } from '@mw-kit/mw-ui'
import moment from 'moment'
import { Controller, useWatch } from 'react-hook-form'

import type { ModalState } from '../../../../../../../../components/MwModal'
import useFormContext from '../../../../context'
import { InputLabel } from '../../../../style'
import { labels } from '../../labels'

const StartLimit = () => {
  const {
    auxForm,
    isAuxInvalid,
    errors: [errors, setErrors],
    modal: [, setModal],
  } = useFormContext()
  const { control, setValue } = auxForm

  const starts_at = useWatch({ control, name: 'starts_at' })
  const ends_at = useWatch({ control, name: 'ends_at' })
  const start_limit = useWatch({ control, name: 'start_limit' })
  const interval = useWatch({ control, name: 'interval' })
  const errorModal: ModalState = {
    title: 'Notificação',
    content: (
      <p>
        Hora limite não pode ser menor que Hora Início e nem maior que a Hora
        Termino.
      </p>
    ),
    buttonType: 'MwButton',
    actions: [
      {
        content: 'Ok',
        onClick: () => setModal(null),
      },
    ],
  }

  const checkStartLimit = () => {
    if (
      !interval ||
      !starts_at ||
      !ends_at ||
      !start_limit ||
      starts_at.length !== 5 ||
      ends_at.length !== 5 ||
      start_limit.length !== 5
    ) {
      return
    }

    const startAt = moment(starts_at, 'HH:mm')
    const endsAt = moment(ends_at, 'HH:mm')
    const startLimit = moment(start_limit, 'HH:mm')

    if (startLimit.isBefore(startAt)) {
      setErrors((prev) => ({
        ...prev,
        start_limit: {
          code: 'INVALID',
          message: 'start_limit before starts_at',
        },
      }))
      setModal(errorModal)
    } else if (startLimit.isAfter(endsAt)) {
      setErrors((prev) => ({
        ...prev,
        start_limit: {
          code: 'INVALID',
          message: 'start_limit after endsAt',
        },
      }))
      setModal(errorModal)
    } else {
      setErrors((prev) => {
        if (!prev?.start_limit) return prev
        const { start_limit, ...rest } = prev
        return rest
      })
    }
  }

  return (
    <MwGrid.Col width='auto'>
      <Controller
        control={control}
        name='start_limit'
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
                value={props.value || ''}
                invalid={isAuxInvalid(props.name) || !!errors?.start_limit}
                required={required}
                setValue={(value) => {
                  setValue(props.name, value)
                }}
                onBlur={() => checkStartLimit()}
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

export default StartLimit
