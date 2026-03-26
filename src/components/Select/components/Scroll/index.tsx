import React from 'react'

import type { VirtualItem, Virtualizer } from '@tanstack/react-virtual'

import Loader from '../../../Loader'
import Popup from '../../../Popup'
import type {
  SelectKeyBuilder,
  SelectOptionComponent,
  SelectRule,
  SelectRuleComponent,
} from '../../types'

import * as S from './styles'

type ScrollProps = {
  menuId: string
  options: unknown[]
  virtualItems: VirtualItem[]
  loading: boolean
  totalSize: number
  measureElement: Virtualizer<Element, Element>['measureElement']
  OptionComponent: SelectOptionComponent<unknown>
  onClickOption: (index: number) => void
  onMouseEnterOption: (index: number) => void
  activeIndex: number
  getKey: SelectKeyBuilder<unknown>
  getIsSelected: (key: string) => boolean
  getFailedRuleByKey: Map<string, SelectRule<unknown>>['get']
  mode: 'single' | 'multi'
} & Pick<React.HTMLAttributes<HTMLDivElement>, 'aria-multiselectable'>

// eslint-disable-next-line react/display-name
const Scroll = React.forwardRef<HTMLDivElement, ScrollProps>(
  (
    {
      menuId,
      loading,
      options,
      virtualItems,
      totalSize,
      measureElement,
      OptionComponent,
      onClickOption,
      onMouseEnterOption,
      activeIndex,
      getKey,
      getIsSelected,
      getFailedRuleByKey,
      mode,
      ...props
    },
    ref,
  ) => {
    const Highlight = mode === 'single' ? S.SingleHighlight : S.MultiHighlight

    return (
      <S.ListContainer>
        {loading ? (
          <Loader filled />
        ) : options.length < 1 ? (
          <S.EmptyMessage>Nenhuma opção encontrada</S.EmptyMessage>
        ) : null}

        <S.ListScroll
          ref={ref}
          id={menuId}
          role='listbox'
          {...props}
          onMouseDown={(e) => e.preventDefault()}
        >
          <S.ListInner style={{ height: `${totalSize}px` }}>
            {virtualItems.map((virtualItem) => {
              const option = options[virtualItem.index]
              if (!option) return null

              const optionKey = getKey(option)
              const failedRule = getFailedRuleByKey(optionKey)
              const disabled = Boolean(failedRule)
              const isSelected = getIsSelected(optionKey)
              const isActive = activeIndex === virtualItem.index

              const Component =
                failedRule?.Component as SelectRuleComponent<unknown>

              return (
                <Popup
                  key={optionKey}
                  enabled={Boolean(Component)}
                  content={() => <Component option={option} />}
                  on='click'
                  closeOnClip
                  placement='right'
                  triggerProps={{
                    ref: measureElement,
                    onMouseEnter: () => onMouseEnterOption(virtualItem.index),
                    onClick: () => onClickOption(virtualItem.index),
                  }}
                  renderTrigger={(props) => (
                    <S.OptionRow
                      id={`${menuId}-option-${virtualItem.index}`}
                      data-index={virtualItem.index}
                      role='option'
                      aria-selected={isSelected}
                      aria-disabled={disabled}
                      $active={isActive}
                      style={{
                        transform: `translateY(${virtualItem.start}px)`,
                      }}
                      {...props}
                    >
                      <Highlight />

                      <OptionComponent
                        option={option}
                        isActive={isActive}
                        isSelected={isSelected}
                        isDisabled={disabled}
                      />
                    </S.OptionRow>
                  )}
                />
              )
            })}
          </S.ListInner>
        </S.ListScroll>
      </S.ListContainer>
    )
  },
)

export default Scroll
