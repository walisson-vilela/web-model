import React from 'react'

import { filterObject } from '../../../../functions/formatters'
import { isObject } from '../../../../functions/validators'
import type { ReactNode } from '../../../../interfaces'
import Form from '../../../Form'

import type { SwitchProps } from './interfaces'
import * as S from './styles'

const Switch = (props: SwitchProps) => {
  const { isRequired, isInvalid, isViewMode, isDisabled } = Form.useContext(
    props.name,
  )

  const invalid = isInvalid() || props.invalid
  const required = isRequired() || props.required
  const disabled = isDisabled() || props.disabled
  const viewMode = isViewMode() || props.viewMode

  const label = isObject<Exclude<typeof props.label, ReactNode | undefined>>(
    props.label,
  )
    ? props.label
    : { label: props.label }

  const htmlProps = filterObject<
    SwitchProps,
    React.InputHTMLAttributes<HTMLInputElement>
  >(props, [
    'label',
    'invalid',
    'required',
    'htmlDisabled',
    'labelProps',
    'viewMode',
    'breakLabel',
  ])

  htmlProps.disabled = props.disabled || props.htmlDisabled

  return (
    <S.Label
      {...(props.labelProps || {})}
      $disabled={disabled}
      $invalid={invalid}
    >
      {label.label && (
        <S.LabelContainer
          $required={required}
          $viewMode={viewMode}
          $breakLabel={props.breakLabel}
        >
          {label.label}
        </S.LabelContainer>
      )}

      {viewMode ? (
        <S.LabelContainer
          $keepSpace
          children={label[props.checked ? 'after' : 'before']}
        />
      ) : (
        <React.Fragment>
          {label.before && <S.LabelContainer children={label.before} />}

          <input {...htmlProps} type='checkbox' />
          <span></span>

          {label.after && <S.LabelContainer children={label.after} />}
        </React.Fragment>
      )}
    </S.Label>
  )
}

export default Switch
