import React, { useCallback } from 'react'

import { MwInput } from '@mw-kit/mw-ui'
import { SelectLoader } from '@mw-kit/mw-ui/types'
import { Controller } from 'react-hook-form'

import { numberOrDefault } from '../../../../../../../utils/Formatters'
import { isBoolean } from '../../../../../../../utils/Validators'
import { useHookFormsAsState } from '../../../../../../../utils/hooks'
import useFormContext from '../../context'
import { Error } from '../../styles'

const name = 'temporary'

const temporaryLoader: SelectLoader = async () => [
  {
    label: 'Temporário',
    data: {},
    value: '1',
  },
  {
    label: 'Definitivo',
    data: {},
    value: '0',
  },
]

const Temporary = () => {
  const {
    form,
    scenery: [scenery],
    data,
  } = useFormContext()

  const {
    formState: { errors },
  } = form

  const [value, setValue] = useHookFormsAsState(name, form)
  const [scenery_id] = useHookFormsAsState('scenery_id', form)

  const loader = useCallback(temporaryLoader, [value, scenery_id])

  return (
    <div>
      {scenery.temporary && (
        <React.Fragment>
          <Controller
            control={form.control}
            name={name}
            render={({ field }) => {
              return (
                <MwInput
                  {...field}
                  type='select'
                  label='Comportamento'
                  placeholder='Selecione'
                  name={name}
                  value={
                    isBoolean(field.value) ? (field.value ? '1' : '0') : ''
                  }
                  setValue={(v) => {
                    const intVal = numberOrDefault(v)
                    setValue(intVal === null ? null : intVal > 0)
                  }}
                  loader={loader}
                  invalid={name in errors}
                  disabled={!!data}
                  required
                />
              )
            }}
          />

          <Error children={errors[name] && errors[name].message} />
        </React.Fragment>
      )}
    </div>
  )
}

export default Temporary
