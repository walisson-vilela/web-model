import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import BRAZILIAN_STATES from '../../../../../../../../constants/uf'
import useAddessContext from '../../../../context'

const City = () => {
  const { form, invalidCheck, setValueOptions, showTitle, modalMode } =
    useAddessContext()

  const { control, setValue } = form

  return (
    <Controller
      control={control}
      name='state'
      render={({ field: props }) =>
        modalMode ? (
          <span>{props.value}</span>
        ) : (
          <MwInput
            {...props}
            type='select'
            placeholder='UF'
            label={showTitle ? 'UF' : ''}
            required
            disabled
            invalid={invalidCheck(props.name)}
            setValue={(value) => setValue(props.name, value, setValueOptions)}
            loader={async () => ({
              lastPage: true,
              options: BRAZILIAN_STATES.acronym.map((type) => ({
                label: type,
                value: type,
                data: {},
              })),
            })}
          />
        )
      }
    />
  )
}

export default City
