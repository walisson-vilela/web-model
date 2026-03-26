import { useEffect } from 'react'

import { Cookies } from 'react-cookie'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from '../../screens/Login'
import Home from '../../standardized/pages/Home'
import { LOGOUT_COOKIE } from '../../utils/Auth'
import NoMatch from '../NoMatch'
import PrivateRoute from '../PrivateRoute'

const RootRoutes = () => {
  useEffect(() => {
    const cookies = new Cookies()
    cookies.remove(LOGOUT_COOKIE)
  }, [])

  return (
    <BrowserRouter basename='/'>
      <Switch>
        <Route exact path='/' component={Login} />

        <Route exact path='/login' component={Login} />

        <PrivateRoute path='/main' component={Home} />

        <Route path='*' component={NoMatch} />
      </Switch>
    </BrowserRouter>
  )
}

export default RootRoutes
