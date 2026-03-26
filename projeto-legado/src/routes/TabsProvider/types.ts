import {
  TabProps,
  TabsProps,
} from '@mw-kit/mw-ui/dist/components/Tabs/interfaces'
import { TabComponent } from '@mw-kit/mw-ui/types'
import { RouteChildrenProps, RouteComponentProps } from 'react-router'

export type RouteTabProps<C extends string = string> = TabProps<
  {
    route: RouteComponentProps
    dirty?: boolean
  },
  C
>

export type RouteId = {
  match: Pick<RouteComponentProps['match'], 'path' | 'url'>
  location: Pick<RouteComponentProps['location'], 'pathname' | 'search'>
}

export type TabsProviderPros = React.PropsWithChildren<RouteChildrenProps>

export type TabsContextProps = TabsProviderPros & {
  tabs: [RouteTabProps[], React.Dispatch<React.SetStateAction<RouteTabProps[]>>]
  active: Exclude<TabsProps<RouteTabProps['data']>['active'], number>
  push: (route: RouteComponentProps) => void
  close: (route: RouteId, redirect?: string | 0) => void
  basePath: string
}

export type RouteTabContextProps = {
  push: TabsContextProps['push']
  close: (redirect?: string | 0) => void
  setLabel: React.Dispatch<React.SetStateAction<string>>
  setDirty: React.Dispatch<React.SetStateAction<boolean>>
}

export type RouteComponentPropsParams<Params> = { [K in keyof Params]?: string }

export type RouteTab<Params extends RouteComponentPropsParams<Params> = {}> =
  TabComponent<{
    route: RouteComponentProps<Params>
    dirty?: boolean
  }>

export type RouteTabProvider<
  Params extends RouteComponentPropsParams<Params> = {},
> = Exclude<RouteTab<Params>['provider'], undefined>
