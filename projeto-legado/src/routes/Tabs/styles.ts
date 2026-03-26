import { MwTabs } from '@mw-kit/mw-ui'
import { TabsProps } from '@mw-kit/mw-ui/dist/components/Tabs/interfaces'
import styled from 'styled-components'

import { RouteTabProps } from '../TabsProvider/types'

type MwTabsComponent = React.FunctionComponent<
  React.PropsWithChildren<TabsProps<RouteTabProps['data']>>
>

export const Tabs = styled(MwTabs as MwTabsComponent)`
  && + div {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0;
    border-width: 0;
    display: flex;
    flex-direction: column;
  }
`
