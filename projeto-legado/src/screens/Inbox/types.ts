export type Tab =
  | ''
  | 'view'
  | 'new'
  | 'reply'
  | 'reply-all'
  | 'forward'
  | 'sent'
  | 'important'

export type TabConfig = {
  tab: Tab
  id?: number
}

export type TabNavigationProps = TabConfig & {
  changeTab: (props: TabConfig | 'previous') => void
}

export type TabComponentProps = TabNavigationProps & {}

export type TabComponent = React.FunctionComponent<TabComponentProps> & {
  Provider?: React.FunctionComponent<React.PropsWithChildren<TabComponentProps>>
}
