import { useCallback } from 'react'

import { MwInput } from '@mw-kit/mw-ui'
import { SelectOption } from '@mw-kit/mw-ui/types'
import { Controller } from 'react-hook-form'

import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../../../../../utils/Validators'
import {
  useHookFormsAsState,
  useSelectLoader,
} from '../../../../../../../../../../utils/hooks'
import useContext from '../../../../../../context'
import { Countries } from '../../../../../../interfaces'

const CountryOperation = () => {
  const { form, isInvalid } = useContext()

  const [countries, setCountries] = useHookFormsAsState('countries', form)

  return (
    <div>
      <Controller
        control={form.control}
        name='countries'
        render={({ field: props }) => {
          const name = 'countries'

          const loader = useCallback(
            useSelectLoader({
              request: {
                url: '/v1/tr/contractors/0/countries',
              },
              parser: (data) => {
                return data.reduce<SelectOption<Countries>[]>((parse, data) => {
                  if (!isObject(data)) return parse

                  const country_id = numberOrDefault(data.country_id)
                  if (!country_id) return parse

                  const region_country = data.region_country
                  if (!isObject(region_country)) return parse

                  const label = notEmptyStringOrDefault(
                    region_country.name,
                    '-',
                  )

                  const response: SelectOption<Countries> = {
                    label,
                    value: country_id.toString(),
                    data: {
                      id: null,
                      country_id,
                      occupation: 'NATIONAL',
                      name: label,
                      states: [],
                      cities: [],
                      segments: [],
                      market_flags: [],
                      states_rule: '',
                      cities_rule: '',
                      segments_rule: '',
                      market_flags_rule: '',
                    },
                  }
                  return [...parse, response]
                }, [])
              },
            }),
            [props.value],
          )

          return (
            <MwInput
              {...props}
              type='select-multiple'
              label='País de Atuação'
              required
              placeholder='Selecione'
              setValue={(value, data) => {
                setCountries([...data] as Countries[])
              }}
              value={countries.map((country) => ({
                value: country.country_id.toString(),
                data: country,
              }))}
              invalid={isInvalid(name)}
              loader={loader}
            />
          )
        }}
      />
    </div>
  )
}

export default CountryOperation
