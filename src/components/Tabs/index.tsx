import React, { useState } from 'react'

import { filterObject } from '../../functions/formatters'

import * as Components from './components'
import { buildComponent, mapComponents, sortTabs } from './functions'
import type {
  TabComponent,
  TabComponents,
  TabProps,
  TabProvider,
  TabsComponent,
  TabsProps,
} from './interfaces'
import * as S from './styled'

const VoidProvider: TabProvider = (props) => (
  <React.Fragment children={props.children} />
)

const Component: TabsComponent = (props) => {
  const components = (props.components || {}) as TabComponents

  const optionsInitial = Array.isArray(props.options[1])
    ? props.options[0]
    : props.options
  const [internalOptions, setInternalOptions] = useState(optionsInitial)
  const [options, setOptions] = (typeof props.options[1] === 'function'
    ? props.options
    : [internalOptions, setInternalOptions]) as [
    TabProps[],
    React.Dispatch<React.SetStateAction<TabProps[]>>,
  ]

  const activeInitial = Array.isArray(props.active) ? props.active[0] : props.active
  const [internalActive, setInternalActive] = useState(activeInitial)
  const [active, setActive] = (
    Array.isArray(props.active) ? props.active : [internalActive, setInternalActive]
  ) as Exclude<TabsProps['active'], number>

  const sortedTabs = sortTabs(options.map((tab, index) => ({ ...tab, index })))

  const activeTabIndex = sortedTabs.findIndex((tab) => tab.index === active)
  const Header = props.header

  const divProps = filterObject<
    typeof props,
    React.HTMLAttributes<HTMLDivElement>
  >(props, [
    'options',
    'active',
    'header',
    'internal',
    'maxTabs',
    'onMaxTabsExceeded',
    'onClose',
    'alwaysOpen',
    'delimiter',
    'spacing',
  ])

  return (
    <React.Fragment>
      <S.Tabs
        {...divProps}
        $internal={props.internal}
        $delimiter={props.delimiter}
        $spacing={props.spacing}
      >
        <Components.ScrollButtons
          {...{
            activeTabIndex,
            tabsLength: options.length,
            internal: props.internal,
          }}
        >
          <Components.TabItem
            active={[active, setActive]}
            tabs={[options, setOptions]}
            sortedTabs={sortedTabs}
            onClose={props.onClose as TabsProps['onClose']}
            alwaysOpen={props.alwaysOpen}
            internal={props.internal}
          />
        </Components.ScrollButtons>
      </S.Tabs>

      {options.map((tab, index) => {
        if (tab.component === undefined) {
          return <React.Fragment key={index} />
        }

        const Component = components[tab.component] as TabComponent
        const Provider = Component.provider || VoidProvider

        const setTab: Parameters<TabProvider>[0]['setTab'] = (s) => {
          setOptions((prev) => {
            if (prev[index] !== tab) return prev
            const newTab = typeof s === 'function' ? s(prev[index]) : s
            if (prev[index] === newTab) return prev
            const newTabs = [...prev]
            newTabs[index] = { ...prev[index], ...newTab }
            return newTabs
          })
        }

        const setLabel: Parameters<TabProvider>[0]['setLabel'] = (s) => {
          setTab((prev) => {
            const label = typeof s === 'function' ? s(prev.label) : s
            return s === label ? prev : { ...prev, label }
          })
        }

        return (
          <Provider
            key={tab.key !== undefined ? tab.key : index}
            label={tab.label}
            data={tab.data}
            setTab={setTab}
            setLabel={setLabel}
            {...(index === active
              ? {
                  active: true,
                  children: (
                    <S.ComponentContainer>
                      {Header && (
                        <S.HeaderContainer>
                          <Header
                            active
                            data={tab.data}
                            label={tab.label}
                            setTab={setTab}
                            setLabel={setLabel}
                          />
                        </S.HeaderContainer>
                      )}
                      <S.ContentContainer>
                        <Component
                          data={tab.data}
                          label={tab.label}
                          setLabel={setLabel}
                        />
                      </S.ContentContainer>
                    </S.ComponentContainer>
                  ),
                }
              : { active: false })}
          />
        )
      })}
    </React.Fragment>
  )
}

const Tabs = Object.assign(Component, {
  mapComponents,
  buildComponent,
})

export default Tabs
