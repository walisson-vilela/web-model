import React, { useEffect, useState } from 'react'

import { filterObject } from '../../functions/formatters'
import type { AbsoluteContainerProps } from '../AbsoluteContainer/interfaces'
import Icon from '../Icon'
import Popup from '../Popup'
import ScrollContainer from '../ScrollContainer'

import type { MenuInterface, MenuOptionLabelProps } from './interfaces'
import * as S from './styles'

const isVisible = (elem: HTMLElement, bound: HTMLElement) => {
  const docViewTop = bound.scrollTop
  const docViewBottom = docViewTop + bound.offsetHeight

  const elemTop = elem.offsetTop
  const elemBottom = elemTop + elem.offsetHeight

  return elemBottom <= docViewBottom && elemTop >= docViewTop
}

const MenuComponent: MenuInterface = (props, ref) => {
  const { close, options, children, highlight } = { ...props }

  const [scrollRef, setScrollRef] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!scrollRef || highlight === undefined) return

    const element = scrollRef.children[highlight] as HTMLElement | undefined
    if (!element) return

    if (isVisible(element, scrollRef)) return

    scrollRef.scrollTo(0, element.offsetTop)
  }, [highlight, scrollRef])

  const absoluteContainerProps = filterObject<
    typeof props,
    Omit<AbsoluteContainerProps, 'children' | 'content'>
  >(props, [
    'after',
    'before',
    'bordered',
    'children',
    'close',
    'containerSpacing',
    'emptyContent',
    'highlight',
    'itemSpacing',
    'loading',
    'onScrollEnd',
    'options',
    'scrollSpacing',
    'scrollTabIndex',
  ])

  return (
    <S.Container
      {...absoluteContainerProps}
      ref={ref}
      $bordered={props.bordered}
      $containerSpacing={props.containerSpacing}
      $itemSpacing={props.itemSpacing}
    >
      <React.Fragment>
        <ScrollContainer
          ref={setScrollRef}
          onScrollEnd={props.onScrollEnd}
          before={props.before}
          after={props.after}
          empty={
            props.emptyContent
              ? {
                  empty: options.length === 0,
                  content: props.emptyContent,
                }
              : undefined
          }
          spacing={props.scrollSpacing}
          loading={props.loading}
          tabIndex={props.scrollTabIndex}
        >
          {options.map((option, index) => {
            const { delimiter, keepOpen, caret, data } = { ...option }

            const closeMenu = keepOpen ? () => {} : close

            let onClick: React.MouseEventHandler<HTMLDivElement> | undefined
            let disabled = option.disabled

            let OptionContent: React.FunctionComponent<{
              children: JSX.Element
            }> = ({ children }) => children

            if (!disabled) {
              const rule = (option.rules || [])
                .map((rule) => {
                  return rule(index, data)
                })
                .find((result) => result !== true)

              if (rule === undefined) {
                const _onClick = option.onClick || (() => {})

                onClick = (e) => {
                  _onClick(index, option, e)
                  closeMenu()
                }
              } else {
                disabled = true
                if (rule !== false) {
                  const ruleProps = rule

                  OptionContent = ({ children }) => (
                    <Popup
                      on='click'
                      placement={ruleProps.placement || 'left'}
                      background={ruleProps.background || 'light'}
                      arrow={ruleProps.arrow || 'none'}
                      zIndex={ruleProps.zIndex || 1100}
                      closeOnClip
                      content={() => <>{ruleProps.content}</>}
                      renderTrigger={(triggerProps) => (
                        <div {...triggerProps}>{children}</div>
                      )}
                    />
                  )
                }
              }
            }

            OptionContent.displayName = 'OptionContent'

            const label = option.label

            const labelOptions = filterObject<
              typeof option,
              MenuOptionLabelProps
            >(option, ['onClick', 'label', 'rules'])
            labelOptions.disabled = disabled

            const LabelComponent =
              typeof label === 'function'
                ? label
                : () => <React.Fragment children={label} />

            return (
              <React.Fragment key={index}>
                <OptionContent>
                  <S.Option
                    onClick={onClick}
                    $disabled={disabled}
                    $border={option.border}
                    $highlighted={index === highlight}
                  >
                    <div>
                      <LabelComponent {...option} disabled={disabled} />
                    </div>

                    {caret ? (
                      <Icon type='feather' icon='chevron_right' width='14px' />
                    ) : null}
                  </S.Option>
                </OptionContent>

                {delimiter && <S.Delimiter />}
              </React.Fragment>
            )
          })}
        </ScrollContainer>

        {children}
      </React.Fragment>
    </S.Container>
  )
}

const Menu = React.forwardRef(MenuComponent) as MenuInterface

export default Menu
