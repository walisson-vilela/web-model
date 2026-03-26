import { RouteComponentProps } from 'react-router'

import { ManagerProps } from '../../../interfaces'

export type TabComponent = React.FunctionComponent<
  ManagerProps & { route: RouteComponentProps }
>
