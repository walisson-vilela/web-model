import { useCallback } from 'react'

import { MwInput, Popup } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import { notEmptyStringOrDefault } from '../../../../../../standardized/utils/formatters'
import { isObject } from '../../../../../../standardized/utils/validators'
import { numberOrDefault } from '../../../../../../utils/Formatters'
import { useSelectLoader } from '../../../../../../utils/hooks'
import useCreateContext from '../../context'

const CountryId = () => {
  const { data, form } = useCreateContext()

  return (
    <Popup
      inverted
      wide
      className='popup-field'
      disabled={!data}
      position='right center'
      content='Não é possível editar o país de origem'
      trigger={
        <div style={{ width: '100%' }}>
          <Controller
            name='country_id'
            control={form.control}
            render={({ field: props }) => {
              const { value } = props

              const loader = useCallback(
                useSelectLoader({
                  request: {
                    url: '/v1/tr/contractors/0/countries',
                  },
                  parser: (data) => {
                    const parsed = data.reduce((parsed, e) => {
                      if (!isObject(e) || !isObject(e.region_country))
                        return parsed

                      const value = numberOrDefault(e.region_country.id)
                      if (!value) return parsed

                      return [
                        ...parsed,
                        {
                          label: notEmptyStringOrDefault(
                            e.region_country.name,
                            '',
                          ),
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
                  label='Selecione o país de origem'
                  required
                  search
                  width='100%'
                  placeholder='Selecione'
                  disabled={!!data}
                  value={`${value}`}
                  setValue={(value) => {
                    form.setValue('country_id', numberOrDefault(value, ''), {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }}
                  loader={loader}
                  onClear={() =>
                    form.setValue('country_id', '', {
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

export default CountryId
