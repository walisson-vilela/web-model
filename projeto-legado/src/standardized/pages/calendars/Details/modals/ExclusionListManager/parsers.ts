import type { Events } from '../Form/types'

type Links = {
  id?: number
  foreign_table?: string
  foreign_id?: number
}

export const parseEvent = (event: Events) => {
  return {
    id: event.id,
    links_out: [
      ['users', 'users', 'user_id'],
      ['teams', 'hierarchy_elements', 'team_id'],
    ].reduce((links, [key, foreign_table, id]) => {
      const typedKey = key as keyof Events
      const currentValue = event[typedKey]
      if (!typedKey || !event[typedKey]) return links
      if (!currentValue) return links

      if (Array.isArray(currentValue)) {
        const newLinks = currentValue.map((e) => {
          const itemId = (e as never)[id]
          if (itemId) {
            return { id: itemId }
          }
          return {
            foreign_table,
            foreign_id: e.id,
          }
        })
        return links.concat(newLinks)
      }

      return links
    }, [] as Links[]),
  }
}
