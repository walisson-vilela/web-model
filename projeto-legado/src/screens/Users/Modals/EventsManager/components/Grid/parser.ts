import {
  dateOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../utils/Formatters'
import { isObject, isOneOf } from '../../../../../../utils/Validators'
import { Event } from '../../interfaces'

export const parserEvent = (data: unknown[]): Event[] => {
  const parsed = data.reduce<Event[]>((acc, e) => {
    if (!isObject(e) || !isObject(e.event)) return acc

    const type = notEmptyStringOrDefault(e.type, '')
    if (!isOneOf(type, ['in', 'out'])) return acc

    const id = numberOrDefault(e.event.id)
    const starts_at = dateOrDefault(
      e.event.starts_at,
      null,
      'YYYY-MM-DD HH:mm:ss',
    )
    if (!id || !starts_at) return acc

    const parser: Event = {
      type,
      interrupted_at: dateOrDefault(
        e.interrupted_at,
        null,
        'YYYY-MM-DD HH:mm:ss',
      ),
      created_at: dateOrDefault(e.created_at, null, 'YYYY-MM-DD HH:mm:ss'),
      modified_at: dateOrDefault(e.modified_at, null, 'YYYY-MM-DD HH:mm:ss'),
      event: {
        id,
        name: notEmptyStringOrDefault(e.event.name, ''),
        type_label: notEmptyStringOrDefault(e.event.type_label, ''),
        starts_at,
        ends_at: dateOrDefault(e.event.ends_at, null, 'YYYY-MM-DD HH:mm:ss'),
        ended_at: dateOrDefault(e.event.ended_at, null, 'YYYY-MM-DD HH:mm:ss'),
        origin: notEmptyStringOrDefault(e.event.origin, ''),
        classification: isObject(e.event.classification)
          ? {
              id: numberOrDefault(e.event.classification.id, 0),
              name: notEmptyStringOrDefault(e.event.classification.name, ''),
            }
          : null,
        file: isObject(e.event.file)
          ? {
              url: notEmptyStringOrDefault(e.event.file.url, ''),
              name: notEmptyStringOrDefault(e.event.file.name, ''),
            }
          : null,
      },

      creator: isObject(e.creator)
        ? {
            name: notEmptyStringOrDefault(e.creator.name, ''),
          }
        : null,
      modifier: isObject(e.modifier)
        ? {
            name: notEmptyStringOrDefault(e.modifier.name, ''),
          }
        : null,
    }

    return [...acc, parser]
  }, [] as Event[])
  return parsed
}
