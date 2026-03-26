import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAuth } from '../contexts'

import { PATHS } from './paths'

const RequireAuth = () => {
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to={PATHS.login} replace state={{ from: location }} />
  }

  return <Outlet />
}

export default RequireAuth
