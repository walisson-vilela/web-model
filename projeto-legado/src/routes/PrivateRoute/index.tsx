import { isEmpty } from 'lodash'
import { Route, RouteProps } from 'react-router-dom'

import { getUserCookies } from '../../utils'
import { LOGOUT_COOKIE } from '../../utils/Auth'
import NoMatch from '../NoMatch'

const PrivateRoute = (props: RouteProps) => {
  const USER = getUserCookies()

  if (!isEmpty(USER)) return <Route {...props} />

  const LOGOUT = getUserCookies(LOGOUT_COOKIE)
  if (LOGOUT !== undefined) return null

  return (
    <Route>
      <NoMatch />
    </Route>
  )
}

export default PrivateRoute
