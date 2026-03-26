import type { EmptyObject } from '../../interfaces'

import type {
  Tab,
  TabComponent,
  TabComponents,
  TabProvider,
} from './interfaces'

export const sortTabs = (
  tabs: (Tab & { index: number })[],
  sorted: (Tab & { index: number })[] = [],
): (Tab & { index: number })[] => {
  if (tabs.length < 1) return sorted

  const tab = tabs[0]
  const { group } = tab

  // se a aba não possui grupo, apenas adicione-a na lista e siga a iteração
  if (!group) {
    return sortTabs(
      // remove a aba da iteração
      tabs.slice(1),
      // adiciona ela à lista ordenada
      [...sorted, tab],
    )
  }

  // se aba possui um grupo, devemos remover as abas do mesmo grupo da lista de iteração (tabs)
  // e adiciona-las na lista de forma ordenada (sorted)

  const res = tabs.reduce<{
    tabs: typeof tabs
    sorted: typeof sorted
  }>(
    ({ tabs, sorted }, t) => {
      // se ela não pertence ao grupo, mantem na lista de iteração (tabs)
      if (t.group !== group) {
        return {
          tabs: [...tabs, t],
          sorted,
        }
      }

      // se ela pertence ao grupo ela deve ser adicionada à lista ordenada (sorted)
      // se aba for primaria adiciona no inicio, se nao, no final
      return t.primary
        ? { tabs, sorted: [t, ...sorted] }
        : { tabs, sorted: [...sorted, t] }
    },
    {
      tabs: [],
      sorted: [],
    },
  )

  // continua a iteração
  return sortTabs(
    // lista de iteração sem as abas do grupo recém processado
    res.tabs,
    // abas já ordenadas, mais o grupo recém processado
    [...sorted, ...res.sorted],
  )
}

export const hasChildren = (tabs: Tab[], group: string | undefined) => {
  return group ? tabs.some((tab) => tab.group === group && !tab.primary) : false
}

export const mapComponents = <C extends string, T = EmptyObject>(obj: {
  [K in C]: TabComponent<T>
}): TabComponents<T, C> => {
  return obj
}

export const buildComponent = <T = EmptyObject>(
  component: TabComponent<T>,
  provider?: TabProvider<T>,
): TabComponent<T> => {
  return provider ? Object.assign(component, { provider }) : component
}
