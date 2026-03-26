import React from 'react'

import { MwLoader, MwTabs } from '@mw-kit/mw-ui'
import { Toaster } from 'react-hot-toast'

import { createRouteTab } from '../../../../routes'
import { keys } from '../../../../utils/Formatters'

import { Calendars, PageHeader } from './components'
import { MainProvider, useMainContext } from './contexts'
import * as S from './styles'
import tabs, { type TabKey } from './tabs'

const Details = createRouteTab(() => {
  const {
    tab: [tab, setTab],
    loading: [loading],
  } = useMainContext()

  const { component: Tab } = tabs[tab as TabKey]

  const tabIndex = Object.keys(tabs).indexOf(tab)

  return (
    <React.Fragment>
      <PageHeader
        description={'Utilize os campos abaixo para gerenciar os eventos'}
      />

      <MwTabs
        active={[
          tabIndex,
          (result) => {
            setTab((prev) => {
              const prevIndex = Object.keys(tabs).indexOf(prev)
              if (result === prevIndex) return prev
              return Object.keys(tabs)[result] as TabKey
            })
          },
        ]}
        options={keys(tabs).map((tab) => {
          const { label } = tabs[tab]
          return { label, data: {} }
        })}
        internal
        alwaysOpen
      />

      <S.MainContainer>
        <div>
          <Tab />
        </div>

        <div>
          <Calendars />
        </div>

        {loading && <MwLoader filled />}
      </S.MainContainer>

      <Toaster position='bottom-right' />
    </React.Fragment>
  )
}, MainProvider)

export default Details
