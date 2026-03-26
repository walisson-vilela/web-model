import React from 'react'

import { RouteTabProvider } from '../../routes/types'

import { tabs } from './constants'
import { useTabNavigationProps } from './hooks'

const Provider: RouteTabProvider<{ id: string; tab: string }> = (props) => {
  const navigationProps = useTabNavigationProps(props.data.route)
  const Tab = tabs[navigationProps.tab]

  return Tab.Provider ? (
    <Tab.Provider {...navigationProps} children={props.children} />
  ) : (
    <React.Fragment children={props.children} />
  )
}

export default Provider
