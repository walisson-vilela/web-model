import React from 'react'

import { Controller } from 'react-hook-form'
import {
  Checkbox as SemanticCheckbox,
  CheckboxProps as SemanticCheckboxProps,
} from 'semantic-ui-react'

import { boolToInt } from '../../../utils/Formatters'
import { isBoolean } from '../../../utils/Validators'
import { Common } from '../interfaces'

interface CheckboxProps extends Common, Omit<SemanticCheckboxProps, 'name'> {}

const Checkbox = (props: CheckboxProps) => {
  const {
    name,
    form: { watch, control },
    shouldTrigger,
  } = { ...props }

  const trigger = shouldTrigger !== false ? props.form.trigger : () => {}
  const onChange = props.onChange || (() => {})

  const value = watch(name)

  // o input do semantic aceita somente 1/0, caso o valor recebido seja booleano, sera necessario fazer conversoes
  const { getValue, getInputValue, checked } = isBoolean(value)
    ? {
        getValue: (value: boolean) => value,
        getInputValue: boolToInt,
        checked: value,
      }
    : {
        getValue: boolToInt,
        getInputValue: (value: any) => value,
        checked: value > 0,
      }

  const inputProps = { ...props }
  delete inputProps.form
  delete inputProps.onChange
  delete inputProps.shouldTrigger
  inputProps.checked = checked

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        // delete field.value

        field.value = getInputValue(field.value)

        return (
          <SemanticCheckbox
            {...field}
            onChange={(
              event: React.FormEvent<HTMLInputElement>,
              data: SemanticCheckboxProps,
            ) => {
              onChange(event, data)

              const e: any = {
                ...event,
                target: {
                  value: getValue(data.checked),
                },
              }

              field.onChange(e)
              trigger()
            }}
            {...inputProps}
          />
        )
      }}
    />
  )
}

export default Checkbox
