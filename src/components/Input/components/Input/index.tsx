import React, { useEffect, useMemo, useRef } from 'react'

import { filterObject } from '../../../../functions/formatters'
import { isString } from '../../../../functions/validators'
import Form from '../../../Form'
import Icon from '../../../Icon'
import Loader from '../../../Loader'
import { getMask } from '../../functions'

import type { InputProps, StyledInputProps } from './interfaces'
import * as S from './styles'

type SetMaskFunction = <
  E extends
    | React.CompositionEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLInputElement>,
>(
  event: E,
  handler: ((event: E) => void) | undefined,
  setValue: (v: string) => void,
  maskFn: (value: string) => string,
) => void

const setMask: SetMaskFunction = (event, handler, setValue, maskFn) => {
  const target = event.target as HTMLInputElement

  const raw = target.value
  const masked = maskFn(raw)

  const [start, end] =
    target.selectionStart === target.selectionEnd &&
    target.selectionEnd === target.value.length
      ? [masked.length, masked.length]
      : [target.selectionStart, target.selectionEnd]

  target.value = masked

  handler && handler(event)
  setValue(masked)

  if (['text', 'search', 'url', 'password'].includes(target.type)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: microbundle ts é antigo
    target.setSelectionRange(start, end)
  }
}

const Input = React.forwardRef(
  (props: InputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const {
      label,
      loading,
      readOnly,
      arrows,
      borderless,
      paddingless,
      clearable,
      onPressEnter,
      width,
    } = {
      ...props,
    }

    const setValue = props.setValue || (() => {})

    const { isRequired, isInvalid, isViewMode, isDisabled } = Form.useContext(
      props.name,
    )
    const isComposing = useRef(false)

    const maskFn = useMemo(() => getMask(props.mask), [props.mask])

    useEffect(() => {
      if (isComposing.current) return
      if (!isString(props.value)) return
      const masked = maskFn(props.value)
      if (masked !== props.value) setValue(masked)
    }, [isComposing.current, props.value])

    const invalid = isInvalid() || props.invalid
    const required = isRequired() || props.required
    const disabled = isDisabled() || props.disabled
    const viewMode = isViewMode() || props.viewMode

    const inputProps = filterObject<InputProps, StyledInputProps>(
      props,
      [
        'arrows',
        'borderless',
        'children',
        'clearable',
        'dirty',
        'htmlDisabled',
        'htmlReadOnly',
        'icon',
        'inputWidth',
        'invalid',
        'label',
        'loading',
        'mask',
        'onPressEnter',
        'paddingless',
        'setValue',
        'viewMode',
        'width',
      ],
      {
        $invalid: invalid,
        type: 'text',
        $arrows: arrows,
        $borderless: borderless,
        $paddingless: paddingless,
      },
    )

    inputProps.onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (isComposing.current) {
        props.onChange && props.onChange(event)
        setValue(event.target.value)
        return
      }

      setMask(event, props.onChange, setValue, maskFn)
    }

    if (inputProps.onKeyDown || onPressEnter) {
      const onKeyDown = inputProps.onKeyDown || (() => {})

      const _onPressEnter = onPressEnter
        ? (event: React.KeyboardEvent<HTMLInputElement>) => {
            event.preventDefault()
            onPressEnter(event)
          }
        : () => {}

      inputProps.onKeyDown = (event) => {
        onKeyDown(event)

        if (event.key === 'Enter') {
          _onPressEnter(event)
        }
      }
    }

    if (inputProps.onKeyUp) {
      const onKeyUp = inputProps.onKeyUp

      inputProps.onKeyUp = (event) => {
        const target = event.target as HTMLInputElement
        const v = target.value

        onKeyUp(event)

        if (v !== target.value) setValue(target.value)
      }
    }

    if (inputProps.onKeyDownCapture) {
      const onKeyDownCapture = inputProps.onKeyDownCapture

      inputProps.onKeyDownCapture = (event) => {
        const target = event.target as HTMLInputElement
        const v = target.value

        onKeyDownCapture(event)

        if (v !== target.value) setValue(target.value)
      }
    }
    inputProps.onCompositionStart = (event) => {
      isComposing.current = true
      props.onCompositionStart?.(event)
    }
    inputProps.onCompositionEnd = (event) => {
      isComposing.current = false
      setMask(event, props.onCompositionEnd, setValue, maskFn)
    }

    if (inputProps.onKeyUpCapture) {
      const onKeyUpCapture = inputProps.onKeyUpCapture

      inputProps.onKeyUpCapture = (event) => {
        const target = event.target as HTMLInputElement
        const v = target.value

        onKeyUpCapture(event)

        if (v !== target.value) setValue(target.value)
      }
    }

    const icon: Required<InputProps>['icon']['icon'] | undefined = (() => {
      const icon = {
        ...(invalid ? { color: 'warningRed' } : {}),
      }

      if (clearable) {
        const callback =
          typeof clearable === 'function' ? clearable : () => setValue('')

        return {
          ...icon,
          type: 'feather',
          icon: 'x',
          width: '14px',
          onClick: (e) => {
            e.preventDefault()
            callback()
          },
        } as Required<InputProps>['icon']['icon']
      }

      if (!props.icon) return props.icon

      return { ...icon, ...props.icon.icon }
    })()

    const { dirty } = props
    const onDirty = (() => {
      if (dirty === undefined || typeof dirty === 'function') return dirty

      if (props.value === dirty) return undefined

      return () => setValue(dirty)
    })()

    if (props.htmlDisabled) inputProps.disabled = true
    if (props.htmlReadOnly) inputProps.readOnly = true

    return (
      <S.Label
        $readOnly={readOnly || viewMode}
        $disabled={disabled}
        $loading={loading}
        $invalid={invalid}
        $paddingless={paddingless}
        $iconPosition={props.icon?.position || 'right'}
        $iconWidths={
          loading
            ? ['14px']
            : [
                ...(icon ? [icon.width || '24px'] : []),
                ...(onDirty ? ['10px'] : []),
              ]
        }
        $width={width}
        $viewMode={viewMode}
      >
        {label && (
          <S.LabelText $required={required} $viewMode={viewMode}>
            {label}
          </S.LabelText>
        )}

        {viewMode ? (
          <S.ViewModeContainer children={inputProps.value || props.children} />
        ) : (
          <S.InputContainer $width={props.inputWidth}>
            <S.Input {...inputProps} ref={ref} />

            {props.children && (
              <S.ChildrenContainer children={props.children} />
            )}

            <S.IconContainer>
              {loading ? (
                <Icon type='jsx' icon={<Loader size='14px' />} width='14px' />
              ) : (
                <React.Fragment>
                  {onDirty && (
                    <Icon
                      {...{
                        type: 'feather',
                        icon: 'rotate_ccw',
                        width: '10px',
                        onClick: props.disabled
                          ? undefined
                          : (e) => {
                              e.preventDefault()
                              onDirty()
                            },
                        ...(invalid ? { color: 'warningRed' } : {}),
                      }}
                    />
                  )}

                  {icon && (
                    <Icon
                      {...icon}
                      {...('onClick' in icon && props.disabled
                        ? { onClick: undefined }
                        : {})}
                    />
                  )}
                </React.Fragment>
              )}
            </S.IconContainer>
          </S.InputContainer>
        )}
      </S.Label>
    )
  },
)

Input.displayName = 'Input'

export default Input
