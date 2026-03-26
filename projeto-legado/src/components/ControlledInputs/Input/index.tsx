import React from 'react'

import { Controller } from 'react-hook-form'
import {
  Icon,
  InputOnChangeData,
  Input as SemanticInput,
  InputProps as SemanticInputProps,
} from 'semantic-ui-react'

import { numberOrDefault } from '../../../utils/Formatters'
import { Common } from '../interfaces'

import { getMask } from './functions'
import { Mask } from './interfaces'
import * as S from './styled'

interface InputProps extends Common, SemanticInputProps {
  mask?: Mask
  arrows?: boolean
  className?: string
}

const Input = (props: InputProps) => {
  const {
    name,
    form: { watch, control, getValues, setValue },
    shouldTrigger,
    arrows,
    className,
  } = { ...props }

  const trigger = shouldTrigger !== false ? props.form.trigger : () => {}
  const onChange = props.onChange || (() => {})
  const mask = getMask(props.mask)

  const inputProps = { ...props }
  delete inputProps.form
  delete inputProps.onChange
  delete inputProps.shouldTrigger
  delete inputProps.mask
  inputProps.value = watch(name)

  const setValueOptions = !shouldTrigger
    ? {}
    : {
        shouldValidade: true,
        shouldDirty: true,
      }

  const onClickUp = () => {
    const value = getValues(name)
    const number = numberOrDefault(value)
    if (number === null) return

    setValue(name, number + 1, setValueOptions)
  }

  const onClickDown = () => {
    const value = getValues(name)
    const number = numberOrDefault(value)
    if (number === null) return

    setValue(name, number - 1, setValueOptions)
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <S.InputContainer>
            <SemanticInput
              {...field}
              onChange={(
                event: React.ChangeEvent<HTMLInputElement>,
                data: InputOnChangeData,
              ) => {
                data.value = event.target.value = mask(event.target.value)
                onChange(event, data)
                field.onChange(event)
                trigger()
              }}
              {...inputProps}
              className={className || ''}
            />

            {arrows && (
              <S.ArrowsContainer>
                <S.Arrow type='button' onClick={onClickUp}>
                  <Icon name='angle up' />
                </S.Arrow>

                <S.Arrow type='button' onClick={onClickDown}>
                  <Icon name='angle down' />
                </S.Arrow>
              </S.ArrowsContainer>
            )}
          </S.InputContainer>
        )
      }}
    />
  )
}

export default Input
