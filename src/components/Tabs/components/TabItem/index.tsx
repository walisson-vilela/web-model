import React from 'react'

import { hasChildren } from '../../functions'
import type { Tab, TabProps, TabsProps } from '../../interfaces'

import * as Component from './components'
import * as S from './styled'

type TabItemProps = {
  active: Exclude<TabsProps['active'], number>
  tabs: [Tab[], React.Dispatch<React.SetStateAction<TabProps[]>>]
  sortedTabs: (Tab & { index: number })[]
} & Pick<TabsProps, 'onClose' | 'alwaysOpen' | 'internal'>

const VoidClose: typeof Component.Close = () => <React.Fragment />

const TabItem = (props: TabItemProps) => {
  const {
    active: [active, setActive],
    tabs: [tabs, setTabs],
    sortedTabs,
    onClose,
    alwaysOpen,
  } = props

  const CloseComponent =
    alwaysOpen || tabs.length < 2 ? VoidClose : Component.Close

  return (
    <React.Fragment>
      {sortedTabs.map(({ index, ...tab }) => {
        const isActive = index === active
        const hasSiblings = hasChildren(tabs, tab.group)
        const canClose = !props.internal && (!tab.primary || !hasSiblings)

        return (
          <S.Container
            key={index}
            {...(isActive ? { className: 'active' } : {})}
          >
            <Component.LabelItem
              children={tab.label}
              primary={tab.primary}
              hasSiblings={hasSiblings}
              onClick={isActive ? undefined : () => setActive(index, tab.data)}
              internal={props.internal}
            />

            {canClose && (
              <CloseComponent
                index={index}
                active={[active, setActive]}
                options={[tabs, setTabs]}
                onClose={onClose as TabsProps['onClose']}
              />
            )}
          </S.Container>
        )
      })}
    </React.Fragment>
  )
}

export default TabItem
