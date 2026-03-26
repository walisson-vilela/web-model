import { useCallback } from 'react'

import { MwInput, Popup } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../../utils/Validators'
import { useSelectLoader } from '../../../../../../../utils/hooks'
import useCreateContext from '../../context'

const GranparentId = () => {
  const { editData, form, grandparent_id, isInvalid } = useCreateContext()

  return (
    <Popup
      inverted
      wide
      className='popup-field'
      disabled={!editData}
      position='right center'
      content='Uma vez criado a Bandeira e associada a um Grupo, não é permitido alterar o Grupo.'
      trigger={
        <div style={{ width: '100%' }}>
          <Controller
            name='grandparent_id'
            control={form.control}
            render={({ field: props }) => {
              const { value } = props

              const loader = useCallback(
                useSelectLoader({
                  request: {
                    url: `/v1/tr/markets/options`,
                    aditionalParams: {
                      level: 1,
                    },
                  },
                  parser: (data) => {
                    const parsed = data.reduce((parsed, e) => {
                      if (!isObject(e)) return parsed

                      const value = numberOrDefault(e.id)
                      if (!value) return parsed

                      return [
                        ...parsed,
                        {
                          label: notEmptyStringOrDefault(e.name, ''),
                          value: value.toString(),
                          data: {},
                          rules: [],
                        },
                      ]
                    }, [])

                    return parsed
                  },
                }),
                [value],
              )

              return (
                <MwInput
                  {...props}
                  type='select'
                  invalid={isInvalid('grandparent_id')}
                  label='Defina um Grupo'
                  required
                  search
                  width='100%'
                  placeholder='Selecione'
                  disabled={!!editData}
                  value={`${value}`}
                  setValue={(value) => {
                    form.setValue(
                      'grandparent_id',
                      numberOrDefault(value, ''),
                      {
                        shouldValidate: true,
                        shouldDirty: true,
                      },
                    )
                  }}
                  loader={loader}
                  onClear={() =>
                    form.setValue('grandparent_id', '', {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                />
              )
            }}
          />
        </div>
      }
    />
  )
}

export default GranparentId
