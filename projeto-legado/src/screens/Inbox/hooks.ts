import { useCallback, useEffect, useState } from 'react'

import { RouteComponentProps } from 'react-router'

import { keys, numberOrDefault } from '../../utils/Formatters'
import { isOneOf } from '../../utils/Validators'

import { BASE_PATH, tabs } from './constants'
import * as Types from './types'

const removeTrailingSlash = (str: string): string => {
  return str.endsWith('/')
    ? removeTrailingSlash(str.slice(0, str.length - 1))
    : str
}

export const useTabNavigationProps = (
  props: RouteComponentProps<{
    tab: string
    id: string
  }>,
): Types.TabNavigationProps => {
  const {
    match: { params: routeParams },
    history,
  } = props

  const id = numberOrDefault(routeParams['id'])
  const tab = isOneOf(routeParams['tab'], keys(tabs)) ? routeParams['tab'] : ''
  const config: Types.TabConfig = {
    tab,
    ...(id ? { id } : {}),
  }

  const [previous, setPrevious] = useState<Types.TabConfig>({
    tab: '',
  })

  useEffect(() => {
    return () => setPrevious({ ...config })
  }, [config.tab, config.id])

  const changeTab: Types.TabNavigationProps['changeTab'] = useCallback(
    (props) => {
      if (props === 'previous') {
        changeTab(previous)
        return
      }

      const url = removeTrailingSlash(
        [BASE_PATH, props.tab, ...(props.id ? [props.id] : [])].join('/'),
      )

      history.push(url)
    },
    [config, previous],
  )

  return {
    ...config,
    changeTab,
  }
}
