import { useMemo } from 'react'

import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import { useClassificationsLoader } from '../../../../../../../../../../../../screens/Users/Modals/EventsManager/Tabs/components/Form/components/Classification/loader'
import useInterruptEventContext from '../../context'

const Classification = () => {
  const { form } = useInterruptEventContext()
  const { control, setValue, watch, isInvalid } = form

  const loader = useClassificationsLoader(0)

  const activate = watch('activate')

  return (
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
            disabled={activate}
            invalid={isInvalid(props.name)}
            required
            search
          />
        )
      }}
    />
  )
}

export default Classification
