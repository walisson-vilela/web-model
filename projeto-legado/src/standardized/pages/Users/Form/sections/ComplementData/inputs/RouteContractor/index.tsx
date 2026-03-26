import { useCallback } from 'react'

import { MwInput } from '@mw-kit/mw-ui'
import { SelectOption } from '@mw-kit/mw-ui/types'
import { Controller } from 'react-hook-form'

import { numberOrDefault } from '../../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../../../utils/Validators'
import { useSelectLoader } from '../../../../../../../../utils/hooks'
import { ParserFunction } from '../../../../../../../../utils/hooks/useSelectLoader/interfaces'
import { notEmptyStringOrDefault } from '../../../../../../../utils/formatters'
import { labels } from '../../../../constants'
import useFormContext from '../../../../context'
import * as T from '../../../../interfaces'

const toSelectOption = (
  route_contractor: T.RouteContractor,
): Pick<SelectOption, 'value' | 'data' | 'label'> => {
  return {
    value: route_contractor.id.toString(),
    label: route_contractor.nickname,
    data: route_contractor,
  }
}

const parser: ParserFunction = (data) => {
  return data.reduce<SelectOption[]>((options, e) => {
    if (!isObject(e)) return options

    const id = numberOrDefault(e.id)
    if (!id) return options

    const route_contractor: T.RouteContractor = {
      id,
      nickname: notEmptyStringOrDefault(e.nickname),
    }

    return [...options, toSelectOption(route_contractor)]
  }, [])
}

const RouteContractor = () => {
  const { form, disabled } = useFormContext()

  const { setValue, isInvalid } = form

  return (
    <Controller
      name='route_contractor'
      control={form.control}
      render={({ field: props }) => {
        const invalid = isInvalid(props.name)

        const loader = useCallback(
          useSelectLoader({
            request: {
              url: 'v1/tr/contractors/options',
            },
            parser,
          }),
          [],
        )

        return (
          <MwInput
            {...props}
            {...labels[props.name]}
            disabled={disabled}
            invalid={invalid}
            type='select'
            loader={loader}
            value={props.value ? (toSelectOption(props.value) as never) : ''}
            setValue={(...args) => {
              const route_contractor = args[1] as T.RouteContractor | null
              setValue(props.name, route_contractor)
            }}
            onClear={() => setValue(props.name, null)}
            search
          />
        )
      }}
    />
  )
}

export default RouteContractor
