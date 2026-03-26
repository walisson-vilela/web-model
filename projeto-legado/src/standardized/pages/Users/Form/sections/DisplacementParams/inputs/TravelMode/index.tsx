import { MwIcon, MwInput } from '@mw-kit/mw-ui'
import { SelectLoader } from '@mw-kit/mw-ui/types'
import { Controller } from 'react-hook-form'

import { keys } from '../../../../../../../../utils/Formatters'
import { isOneOf } from '../../../../../../../../utils/Validators'
import { TRAVEL_MODE } from '../../../../../labels'
import { labels } from '../../../../constants'
import useFormContext from '../../../../context'

import * as S from './styles'

const Label = (props: { travel_mode: keyof typeof TRAVEL_MODE }) => {
  const { icon, label } = TRAVEL_MODE[props.travel_mode]

  return (
    <S.OptionLabel>
      <MwIcon color='darkBlue' width='18px' {...icon} />

      {label}
    </S.OptionLabel>
  )
}

const loader: SelectLoader = async () => [
  {
    value: TRAVEL_MODE.PUBLIC.value,
    label: <Label travel_mode={TRAVEL_MODE.PUBLIC.value} />,
    data: {},
  },
  {
    value: TRAVEL_MODE.MOTORCICLE.value,
    label: <Label travel_mode={TRAVEL_MODE.MOTORCICLE.value} />,
    data: {},
  },
  {
    value: TRAVEL_MODE.CAR.value,
    label: <Label travel_mode={TRAVEL_MODE.CAR.value} />,
    data: {},
  },
]

const TravelMode = () => {
  const { form, originals, disabled } = useFormContext()

  const { setValue, isInvalid } = form

  return (
    <Controller
      name='travel_mode'
      control={form.control}
      render={({ field: props }) => {
        const invalid = isInvalid(props.name)

        return (
          <MwInput
            {...props}
            {...labels[props.name]}
            disabled={disabled}
            invalid={invalid}
            type='select'
            loader={loader}
            value={props.value || ''}
            setValue={(value) => {
              if (!isOneOf(value, keys(TRAVEL_MODE))) {
                setValue(props.name, null)
                setValue('less_walking', 0)
                return
              }

              setValue(props.name, value)
              if (value !== TRAVEL_MODE.PUBLIC.value) {
                setValue('less_walking', 0)
                return
              }

              setValue(
                'less_walking',
                originals.travel_mode !== TRAVEL_MODE.PUBLIC.value
                  ? 1000
                  : originals.less_walking,
              )
            }}
            onClear={() => setValue(props.name, null)}
            inputWidth='220px'
          />
        )
      }}
    />
  )
}

export default TravelMode
