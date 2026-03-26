import { isArray, isObject } from 'lodash'

import Bullet from '../../../components/Bullet'
import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../utils/Formatters'

import { BodyInterface, DataInterface } from './interfaces'
import { status } from './labels'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (data: DataInterface[]): BodyInterface[] => {
  return data.reduce<BodyInterface[]>((parsed, e) => {
    if (!isObject(e)) return parsed

    const id = notEmptyStringOrDefault(e.id)
    const hierarchy_id = numberOrDefault(e.hierarchy_id)
    if (!id || !hierarchy_id) return parsed

    const item: BodyInterface = {
      id,
      status: booleanOrDefault(e.active),
      status_jsx: null,
      name: notEmptyStringOrDefault(e.name),
      country:
        isObject(e.countries) && notEmptyStringOrDefault(e.countries[0].name),
      country_id: numberOrDefault(e.country_id),
      hierarchy_id,
      regions:
        isArray(e.regions) &&
        e.regions
          .map((region) => numberOrDefault(region.id, 0))
          .filter(Boolean),
      area_count: numberOrDefault(e.area_count),
      route_count: numberOrDefault(e.route_count),
      store_count: numberOrDefault(e.store_count),
      user_count: numberOrDefault(e.user_count),
    }

    if (item.status !== null) {
      item.status_jsx = (
        <Bullet
          content={notEmptyStringOrDefault(e.active_text)}
          color={status[+item.status].color}
        />
      )
    }

    ;['area_count', 'route_count', 'store_count', 'user_count'].forEach((f) => {
      if (item[f] < 1) item[f] = null
    })

    return [...parsed, item]
  }, [])
}

export default parser
