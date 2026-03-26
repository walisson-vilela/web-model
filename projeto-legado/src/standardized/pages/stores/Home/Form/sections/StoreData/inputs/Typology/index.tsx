import { useCallback } from 'react'

import { MwGrid, MwInput } from '@mw-kit/mw-ui'
import { SelectOption } from '@mw-kit/mw-ui/types'
import { Controller } from 'react-hook-form'

import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../../../utils/Formatters'
import { useSelectLoader } from '../../../../../../../../../utils/hooks'
import { ParserFunction } from '../../../../../../../../../utils/hooks/useSelectLoader/interfaces'
import { isObject } from '../../../../../../../../utils/validators'
import useFormContext from '../../../../context'
import { Form } from '../../../../interfaces'
import labels from '../../../../labels'

type TypologyType = Exclude<Form['typology'], null>

const parser: ParserFunction<TypologyType> = (data) => {
  return data.reduce<SelectOption<TypologyType>[]>((parsed, e) => {
    if (!isObject(e)) return parsed

    const id = numberOrDefault(e.id)
    if (!id) return parsed

    const name = notEmptyStringOrDefault(e.name, '')

    const option: SelectOption<TypologyType> = {
      label: name,
      data: { id, name },
      value: id.toString(),
    }

    return [...parsed, option]
  }, [])
}

const Typology = () => {
  const { form, isInvalid, originals } = useFormContext()
  const { setValue } = form

  return (
    <MwGrid.Col width='3'>
      <Controller
        name='typology'
        control={form.control}
        render={({ field: props }) => {
          const loader = useCallback(
            useSelectLoader({
              request: {
                url: '/v1/tr/typologies',
                aditionalParams: {
                  list: 1,
                  active: 1,
                  sort: 'name',
                },
              },
              parser,
            }),
            [props.value],
          )

          const initialLoader = useCallback((): SelectOption[] => {
            return originals.typology
              ? [
                  {
                    label: originals.typology.name,
                    data: originals.typology,
                    value: originals.typology.id.toString(),
                  },
                ]
              : []
          }, [originals])

          return (
            <MwInput
              {...props}
              type='select'
              label={labels[props.name].label}
              placeholder={labels[props.name].placeholder}
              required={labels[props.name].required}
              invalid={isInvalid(props.name)}
              initialLoader={initialLoader}
              loader={loader}
              value={
                props.value
                  ? {
                      label: props.value.name,
                      data: props.value,
                      value: props.value.id.toString(),
                    }
                  : ''
              }
              setValue={(id, value) => {
                const v = id ? (value as TypologyType) : null
                setValue(props.name, v)
              }}
              onClear={() => setValue(props.name, null)}
              search
              width='100%'
            />
          )
        }}
      />
    </MwGrid.Col>
  )
}

export default Typology
