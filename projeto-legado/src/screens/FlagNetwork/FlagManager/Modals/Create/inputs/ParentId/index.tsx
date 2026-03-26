import { useCallback } from 'react'

import { MwInput, Popup } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import { notEmptyStringOrDefault } from '../../../../../../../standardized/utils/formatters'
import { isObject } from '../../../../../../../standardized/utils/validators'
import { numberOrDefault } from '../../../../../../../utils/Formatters'
import { useSelectLoader } from '../../../../../../../utils/hooks'
import useCreateContext from '../../context'

const ParentId = () => {
  const { editData, form, isInvalid } = useCreateContext()
  const grandParentId = form.watch('grandparent_id')

  return (
    <Popup
      inverted
      wide
      className='popup-field'
      disabled={!editData}
      position='right center'
      content='Uma vez criado a Bandeira e associada a uma Rede, não é permitido alterar a Rede.'
      trigger={
        <div style={{ width: '100%' }}>
          <Controller
            name='parent_id'
            control={form.control}
            render={({ field: props }) => {
              const { value } = props

              const loader = useCallback(
                useSelectLoader({
                  request: {
                    url: `/v1/tr/markets/options`,
                    aditionalParams: { level: 2, parent_id: grandParentId },
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
                [value, grandParentId],
              )

              return (
                <MwInput
                  {...props}
                  type='select'
                  label='Defina uma Rede'
                  invalid={isInvalid('parent_id')}
                  required
                  search
                  width='100%'
                  placeholder='Selecione'
                  value={`${value}`}
                  setValue={(value) => {
                    form.setValue('parent_id', value, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }}
                  position='right bottom'
                  {...(editData
                    ? { disabled: true, loader }
                    : grandParentId
                    ? { loader }
                    : { disabled: true, loader: async () => [] })}
                  onClear={() =>
                    form.setValue('parent_id', '', {
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

export default ParentId
