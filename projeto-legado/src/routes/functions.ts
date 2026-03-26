import { MwTabs } from '@mw-kit/mw-ui'
import { TabComponent } from '@mw-kit/mw-ui/types'
import { RouteComponentProps } from 'react-router'

import { RouteComponentPropsParams, RouteTab } from './TabsProvider/types'

export const createRouteTab = <
  Params extends RouteComponentPropsParams<Params> = {},
>(
  component: Exclude<RouteTab<Params>, 'provider'>,
  provider?: RouteTab<Params>['provider'],
): TabComponent<{
  route: RouteComponentProps<Params>
  dirty?: boolean
}> => {
  return MwTabs.buildComponent(component, provider)
}
