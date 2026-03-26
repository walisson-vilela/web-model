import Bullet from '../../../../components/Bullet'
import EPIExpiration from '../../../../components/EPIExpiration'
import { notEmptyStringOrDefault } from '../../../../standardized/utils/formatters'
import {
  booleanOrDefault, numberOrDefault
} from '../../../../utils/Formatters'
import { isObject } from '../../../../utils/Validators'
import { BodyInterface } from './interfaces'
import { status as statusLabels } from './labels'

const parser = (data: unknown[]): BodyInterface[] => {
  const parsed = data.reduce<BodyInterface[]>((acc, item) => {
    if (!isObject(item)) return acc

    const status = booleanOrDefault(item.status, false) ? 1 : 0
    const parse: BodyInterface = {
      id: numberOrDefault(item.id),
      epi_type_id: numberOrDefault(item.epi_type_id),
      active: status,
      active_jsx: (
        <Bullet
          content={statusLabels[status].name}
          color={statusLabels[status].color}
        />
      ),
      epi_expiration_months: (
        <EPIExpiration
        epi_expiration_months={notEmptyStringOrDefault(item.epi_type.epi_expiration_months, '')}
        />
      ),
      size: item.epi_type.name + ' ' +  item.size,
      inventory_min: numberOrDefault(item.inventory_min),
      inventory_count: numberOrDefault(item.inventory_count),
      inventory_manual_decrease: numberOrDefault(item.inventory_manual_decrease),
    }
    acc.push(parse)
    return acc
  }, [])

  return parsed
}


export default parser
