import type { EmptyObject, SpacingOrZero, Spacings } from '../../interfaces'

export type Tab<T = EmptyObject> = {
  /**
   * Define the tab label.
   */
  label: string

  /**
   * Define the tab data.
   */
  data: T

  /**
   * Providing a unique and static key will prevent remount the component when closing a previous tab
   */
  key?: React.Key | null
  group?: string
  primary?: boolean
}

export type TabShellProps<T = EmptyObject> = {
  active: boolean
  setTab: React.Dispatch<React.SetStateAction<Tab<T>>>
  setLabel: React.Dispatch<React.SetStateAction<string>>
} & Tab<T>

export type TabProvider<T = EmptyObject> = React.FunctionComponent<
  React.PropsWithChildren<TabShellProps<T>>
>

export type TabHeader<T = EmptyObject> = React.FunctionComponent<TabShellProps<T>>

export type TabComponent<T = EmptyObject> = React.FunctionComponent<{
  data: T
  label: string
  setLabel: React.Dispatch<React.SetStateAction<string>>
}> & {
  provider?: TabProvider<T>
}

export type TabProps<T = EmptyObject, C extends string = string> = Tab<T> & {
  /**
   * Specifies which component, will mount/unmount everytime the tab is ACTIVATED/INACTIVATED
   */
  component?: C
}

export type TabComponents<T = EmptyObject, C extends string = string> = {
  [K in C]: TabComponent<T>
}

export interface TabsProps<T = EmptyObject, C extends string = string>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * list of components
   */
  components?: TabComponents<T, C>
  /**
   * Array with available tabs.
   */
  options:
    | TabProps<T, C>[]
    | [TabProps<T, C>[], React.Dispatch<React.SetStateAction<TabProps<T, C>[]>>]
  /**
   * React state to control which tab is active.
   */
  active: number | [number, (active: number, data: T) => void]
  /**
   * Optional header rendered inside the active tab content area.
   */
  header?: TabHeader<T>
  /**
   * Sets the style of the tabs to internal.
   */
  internal?: boolean
  /**
   * Sets the maximum limit of opened tabs.
   */
  maxTabs?: number
  /**
   * Run an action when exceeding the maximum tab limit.
   */
  onMaxTabsExceeded?: (maxTabs?: number) => void
  /**
   * disable close button
   */
  alwaysOpen?: true
  /**
   * border bottom style
   */
  delimiter?: 'blue' | 'grey' | 'none'
  /**
   * container spacing
   */
  spacing?: SpacingOrZero | Spacings
  /**
   * callback when closing a tab
   */
  onClose?: (
    index: number,
    tab: TabProps<T>,
    event: React.MouseEvent,
  ) => boolean | Promise<boolean>
}

export type TabsComponent = <T = EmptyObject, C extends string = string>(
  props: TabsProps<T, C>,
) => JSX.Element
