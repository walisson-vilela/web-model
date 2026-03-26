import { useCallback } from 'react'

import { MwInput, Popup } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import { notEmptyStringOrDefault } from '../../../../../../../standardized/utils/formatters'
import { isObject } from '../../../../../../../standardized/utils/validators'
import { numberOrDefault } from '../../../../../../../utils/Formatters'
import { useSelectLoader } from '../../../../../../../utils/hooks'
import useCreateContext from '../../context'

const NetworkId = () => {
  const { editData, form, isInvalid } = useCreateContext()

  return (
    <Popup
      inverted
      wide
      className='popup-field'
      disabled={!editData}
      position='right center'
      content='Uma vez criado a rede e associada a um grupo, não é permitido alterar o grupo.'
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
                    url: '/v1/tr/markets/options?level=1',
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
                  label={
                    !editData
                      ? 'Selecione o grupo a qual será criado a rede'
                      : 'Grupo associado'
                  }
                  required
                  search
                  width='100%'
                  invalid={isInvalid('parent_id')}
                  placeholder='Selecione'
                  disabled={!!editData}
                  value={`${value}`}
                  setValue={(value) => {
                    form.setValue('parent_id', numberOrDefault(value, ''), {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }}
                  loader={loader}
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

export default NetworkId
