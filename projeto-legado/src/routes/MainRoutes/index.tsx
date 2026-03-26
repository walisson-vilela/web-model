import React, { useEffect } from 'react'

import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom'

import useHomeContext from '../../standardized/pages/Home/context'
import NoMatch from '../NoMatch'
import RouteList from '../RouteList'
import Tabs from '../Tabs'
import { useTabsContext } from '../TabsProvider'

import * as S from './styles'

const RoutePusher = (props: RouteComponentProps) => {
  const { push } = useTabsContext()

  useEffect(() => {
    push(props)
  }, [props.match.url])

  return <React.Fragment />
}

const Middleware = (props: RouteComponentProps) => {
  const { disabled } = useHomeContext()

  if (!disabled) return <RoutePusher {...props} />

  const path =
    disabled === 'password' ? '/main/user/password' : '/main/terms/pendings'

  if (props.match.path === path) return <RoutePusher {...props} />

  return <Redirect to={path} />
}

const MainRoutes = () => {
  const { match } = useTabsContext()

  const path = match ? match.path : ''

  return (
    <React.Fragment>
      <S.Content>
        <Switch>
          {Object.keys(RouteList).reduce<JSX.Element[]>((list, prefix) => {
            return [
              ...list,
              ...RouteList[prefix].map(({ path: url }, index) => {
                const fullPath = [path, prefix, url].join('/').replace(/\/$/, '')

                return (
                  <Route
                    exact
                    key={['route', prefix, index].join('-')}
                    path={fullPath}
                    component={Middleware}
                  />
                )
              }),
            ]
          }, [])}

          <Route path='*' component={NoMatch} />
        </Switch>

        <Tabs />
      </S.Content>
    </React.Fragment>
  )
}

export default MainRoutes
