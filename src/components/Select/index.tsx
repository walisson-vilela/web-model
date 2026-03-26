import React, { useId, useMemo, useState } from 'react'

import { FloatingPortal } from '@floating-ui/react'

import { colors } from '../../theme/constants'
import Form from '../Form'
import Icon from '../Icon'

import { useFloatingMenu } from './hooks'
import useSelect from './instances'
import * as S from './styles'
import type { SelectProps } from './types'

// eslint-disable-next-line react/display-name
const Select = React.forwardRef<HTMLButtonElement, SelectProps<unknown>>(
  (props, ref) => {
    const [open, setOpen] = useState(false)

    const id = props.id || useId()

    const { isRequired, isInvalid, isViewMode, isDisabled } = Form.useContext(
      props.name,
    )

    const invalid = isInvalid() || props.invalid
    const required = isRequired() || props.required
    const disabled = isDisabled() || props.disabled
    const viewMode = isViewMode() || props.viewMode

    const { floating, transition, interactions } = useFloatingMenu({
      open,
      onOpenChange: setOpen,
    })

    const height = useMemo(() => {
      if (transition.status !== 'open') return 0
      if (props.height !== undefined) return props.height
      return props.type === 'single-select' ? 240 : 260
    }, [transition.status !== 'open', props.type, props.height])

    const menuId = useId()

    const onTriggerKeyDown = (
      event: React.KeyboardEvent<HTMLButtonElement>,
    ) => {
      if (!open && ['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
        event.preventDefault()
        setOpen(true)
      }
    }

    const { isEmpty, placeholder, Component, onClear, buttonProps } =
      useSelect(props)

    return (
      <React.Fragment>
        {props.label !== undefined && (
          <S.Label htmlFor={id} $viewMode={viewMode} children={props.label} />
        )}

        <S.Trigger
          id={id}
          type='button'
          role='combobox'
          aria-haspopup='listbox'
          aria-expanded={open}
          aria-controls={menuId}
          $open={open}
          $empty={isEmpty}
          $viewMode={viewMode}
          aria-readonly={props.readOnly || viewMode}
          aria-invalid={invalid}
          aria-required={required && !viewMode}
          {...interactions.getReferenceProps({
            ...buttonProps,
            disabled,

            onClick: ((event) => {
              if (props.readOnly || viewMode || disabled) return
              setOpen((current) => !current)
              buttonProps.onClick?.(event)
            }) as React.HTMLAttributes<HTMLButtonElement>['onClick'],

            onKeyDown: ((event) => {
              if (props.readOnly || viewMode || props.disabled) return
              onTriggerKeyDown(event)
              buttonProps.onKeyDown?.(event)
            }) as React.HTMLAttributes<HTMLButtonElement>['onKeyDown'],
          })}
          ref={(node) => {
            floating.refs.setReference(node)
            if (typeof ref === 'function') {
              ref(node)
            } else if (ref) {
              ref.current = node
            }
          }}
        >
          <S.TriggerValue>{placeholder}</S.TriggerValue>

          {!viewMode && (
            <Icon
              width='14px'
              color={props.invalid ? colors.warningRed : colors.darkGrey}
              {...(!isEmpty &&
              props.clearable &&
              !props.disabled &&
              !props.readOnly
                ? {
                    type: 'feather',
                    icon: 'x',
                    onClick: (e) => {
                      e.stopPropagation()
                      onClear()
                    },
                    strokeWidth: '4px',
                  }
                : {
                    type: 'feather',
                    icon: 'chevron_down',
                  })}
            />
          )}
        </S.Trigger>

        {transition.isMounted ? (
          <FloatingPortal>
            <S.FloatingWrapper
              ref={floating.refs.setFloating}
              style={
                {
                  ...floating.floatingStyles,
                  '--height': `${height}px`,
                } as React.CSSProperties
              }
              {...interactions.getFloatingProps()}
            >
              <div>
                <Component
                  {...props}
                  menuId={menuId}
                  onClose={() => setOpen(false)}
                />
              </div>
            </S.FloatingWrapper>
          </FloatingPortal>
        ) : null}
      </React.Fragment>
    )
  },
) as <Option>(props: SelectProps<Option>) => JSX.Element

export default Object.assign(Select, {
  OptionContainer: S.OptionContainer,
})
