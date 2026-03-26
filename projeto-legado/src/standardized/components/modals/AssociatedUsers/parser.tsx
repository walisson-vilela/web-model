import { Bullet } from '../../../../components/Bullet/styles'
import { status as statusLabels } from '../../../../screens/Areas/Manager/labels'
import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../utils/Formatters'
import { isObject } from '../../../utils/validators'

import { BodyInterface } from './interfaces'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (data: unknown[]): BodyInterface[] => {
  const response = data.reduce<BodyInterface[]>((parsed, aux) => {
    if (!isObject(aux)) {
      return parsed
    }

    const id = numberOrDefault(aux.id)
    if (!id) return parsed

    const item: BodyInterface = {
      id,
      name: notEmptyStringOrDefault(aux.name, ''),
      status: booleanOrDefault(aux.active, false),
      name_jsx: null,
      role_name: null,
      inactivation_reason_name: null,
      supervisor_name: null,
      route_names: null,
    }

    item.name_jsx = (
      <Bullet
        color={statusLabels[item.status ? 1 : 0].color}
        children={item.name}
      />
    )

    if (isObject(aux.role)) {
      item.role_name = notEmptyStringOrDefault(aux.role.name)
    }

    if (isObject(aux.event)) {
      item.inactivation_reason_name = notEmptyStringOrDefault(
        isObject(aux.event.classification)
          ? aux.event.classification.name
          : aux.event.name,
      )
    }

    if (
      isObject(aux.hierarchies_user) &&
      isObject(aux.hierarchies_user.superior)
    ) {
      item.supervisor_name = notEmptyStringOrDefault(
        aux.hierarchies_user.superior.name,
      )
    }

    if (Array.isArray(aux.routes)) {
      const route_names = aux.routes.reduce((route_names, e) => {
        if (isObject(e)) return route_names
        const name = notEmptyStringOrDefault(e.name)
        return name ? [...route_names, name] : route_names
      }, [])

      if (route_names.length > 0) item.route_names = route_names.join(', ')
    }

    return [...parsed, item]
  }, [])

  return response
}

export default parser
