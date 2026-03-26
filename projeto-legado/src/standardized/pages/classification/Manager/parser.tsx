import Bullet from '../../../../components/Bullet'
import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../utils/Formatters'
import { isObject } from '../../../../utils/Validators'

import { BodyInterface, DataInterface } from './interfaces'
import { status as statusLabels } from './labels'

// Essa função irá pegar os dados recebidos e fazer o parse para o formato que o manager precisa.
const parser = (data: DataInterface[]): BodyInterface[] => {
  return data.map((e) => {
    const active = booleanOrDefault(e.active, false)

    const parsed: BodyInterface = {
      id: numberOrDefault(e.id),
      active,
      active_jsx: (
        <Bullet
          content={statusLabels[+active].name}
          color={statusLabels[+active].color}
        />
      ),
      scenery_id: numberOrDefault(e.scenery_id),
      scenery_label: notEmptyStringOrDefault(e.scenery_label),
      ...(isObject(e.scenery)
        ? {
            scenery_temporary: booleanOrDefault(e.scenery.temporary, false),
            can_upload_file: booleanOrDefault(e.scenery.can_upload_file, false),
          }
        : {
            scenery_temporary: false,
            can_upload_file: false,
          }),
      name: notEmptyStringOrDefault(e.name),
      action_id: booleanOrDefault(e.classification_action_id),
      temporary: booleanOrDefault(e.temporary),
      temporary_label: notEmptyStringOrDefault(e.temporary_label),
      default: booleanOrDefault(e.default),
      default_label: notEmptyStringOrDefault(e.default_label),
      required_file: booleanOrDefault(e.required_file, false),
      dependency_count: numberOrDefault(e.dependency_count, 0),
      future_dependency_count: numberOrDefault(e.future_dependency_count, 0),
    }

    return parsed
  })
}

export default parser
