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

type ClassificationType = Exclude<Form['classification'], null>

const parser: ParserFunction<ClassificationType> = (data) => {
  return data.reduce<SelectOption<ClassificationType>[]>((parsed, e) => {
    if (!isObject(e)) return parsed

    const id = numberOrDefault(e.id)
    if (!id) return parsed

    const name = notEmptyStringOrDefault(e.name, '')

    const option: SelectOption<ClassificationType> = {
      label: name,
      data: { id, name },
      value: id.toString(),
    }

    return [...parsed, option]
  }, [])
}

const Classification = () => {
  const { form, isInvalid, originals } = useFormContext()
  const { setValue } = form

  return (
    <MwGrid.Col width='3'>
      <Controller
        name='classification'
        control={form.control}
        render={({ field: props }) => {
          const loader = useCallback(
            useSelectLoader({
              request: {
                url: '/v1/classifications',
                aditionalParams: {
                  scenery_id: 14,
                  active: 1,
                  sort: 'name',
                },
              },
              parser,
            }),
            [props.value],
          )

          const initialLoader = useCallback((): SelectOption[] => {
            return originals.classification
              ? [
                  {
                    label: originals.classification.name,
                    data: originals.classification,
                    value: originals.classification.id.toString(),
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
                const v = id ? (value as ClassificationType) : null
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

export default Classification
