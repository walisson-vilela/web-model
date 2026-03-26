import { Navigate, type RouteObject } from 'react-router-dom'

import HomePage from '../pages/Home'
import LoginPage from '../pages/Login'
import {
  HOME_SCREEN_DEFAULT_PATH,
  HOME_SCREEN_NODES,
  flattenHomeScreenRoutes,
} from '../pages/Home/screens'

import RequireAuth from './RequireAuth'
import { PATHS } from './paths'

const routes: RouteObject[] = [
  {
    path: PATHS.root,
    element: <Navigate to={PATHS.login} replace />,
  },
  {
    path: PATHS.login,
    element: <LoginPage />,
  },
  {
    element: <RequireAuth />,
    children: [
      {
        path: PATHS.app,
        element: <HomePage />,
        children: [
          {
            index: true,
            element: (
              <Navigate to={`${PATHS.app}/${HOME_SCREEN_DEFAULT_PATH}`} replace />
            ),
          },
          ...flattenHomeScreenRoutes(HOME_SCREEN_NODES),
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={PATHS.login} replace />,
  },
]

export default routes
