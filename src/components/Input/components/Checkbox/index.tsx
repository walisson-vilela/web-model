import React from 'react'

import { filterObject } from '../../../../functions/formatters'
import Form from '../../../Form'

import type { CheckboxProps, LabelContentProps } from './interfaces'
import * as S from './styles'

const DefaultLabel: React.FunctionComponent<
  React.PropsWithChildren<LabelContentProps>
> = (props) => {
  return (
    <S.LabelContent
      $required={props.required}
      $viewMode={props.viewMode}
      children={props.children}
    />
  )
}

const Checkbox = React.forwardRef(
  (props: CheckboxProps, ref?: React.ForwardedRef<HTMLInputElement>) => {
    const { padding, bordered } = props

    const { isRequired, isInvalid, isViewMode, isDisabled } = Form.useContext(
      props.name,
    )

    const invalid = isInvalid() || props.invalid
    const required = isRequired() || props.required
    const disabled = isDisabled() || props.disabled
    const viewMode = isViewMode() || props.viewMode

    const htmlProps = filterObject<
      CheckboxProps,
      React.InputHTMLAttributes<HTMLInputElement>
    >(props, ['label', 'invalid', 'required', 'padding', 'bordered'])

    const [LabelComponent, children] = (() => {
      if (!props.label) {
        return [
          (() => null) as Exclude<
            CheckboxProps['label'],
            React.ReactNode | undefined
          >,
        ] as const
      }
      return typeof props.label === 'function'
        ? ([props.label] as const)
        : ([DefaultLabel, props.label] as const)
    })()

    return (
      <S.Label
        $disabled={disabled}
        $required={required}
        $invalid={invalid}
        $bordered={!viewMode && bordered}
        $padding={padding}
        $readOnly={props.readOnly || viewMode}
        $width={props.width}
        $viewMode={viewMode}
      >
        <input
          {...htmlProps}
          type='checkbox'
          ref={ref}
          disabled={htmlProps.disabled || viewMode}
        />
        <S.Checkmark />
        <LabelComponent
          disabled={disabled}
          required={required}
          viewMode={viewMode}
          invalid={invalid}
          bordered={bordered}
          padding={padding}
          children={children}
        />
      </S.Label>
    )
  },
)

Checkbox.displayName = 'Checkbox'

export default Checkbox
