import type React from 'react'

import { ModalProvider, TabProvider } from '../contexts'
import type { TabComponent, TabId } from '../types'

import Meettings from './Meettings'
import RegionalHollidays from './RegionalHollidays'

const Tab = (Component: TabComponent): React.FunctionComponent => {
  return Object.assign(
    () => (
      <TabProvider>
        <ModalProvider options={Component.modals}>
          <Component />
        </ModalProvider>
      </TabProvider>
    ),
    {
      displayName: 'TabWrapper',
    },
  )
}

export type TabKey = Extract<TabId, 'REGIONAL_HOLIDAY' | 'MEETING'>

const tabs: Readonly<
  Record<
    TabKey,
    {
      label: string
      types: string[]
      component: React.FunctionComponent
    }
  >
> = {
  REGIONAL_HOLIDAY: {
    label: 'Feriados Regionais',
    types: ['REGIONAL_HOLIDAY'],
    component: Tab(RegionalHollidays),
  },
  MEETING: {
    label: 'Reuniões, Convenções e Treinamentos',
    types: ['MEETING', 'CONVENTION', 'COACHING'],
    component: Tab(Meettings),
  },
}
export default tabs
