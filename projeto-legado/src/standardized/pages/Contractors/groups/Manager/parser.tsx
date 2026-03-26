import Bullet from '../../../../../components/Bullet'
import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../utils/Formatters'
import { AccountList, ResponsibleList } from '../../components'

import { BodyInterface, DataInterface } from './interfaces'
import { status as statusLabels } from './labels'

export const managerParser = (data: DataInterface[]): BodyInterface[] => {
  return data.reduce<BodyInterface[]>((data, e) => {
    const status = booleanOrDefault(e.status, false) ? 1 : 0
    const parsed: BodyInterface = {
      active_jsx: (
        <Bullet
          content={notEmptyStringOrDefault(e.status_label)}
          color={statusLabels[status].color}
        />
      ),
      active: status,
      id: numberOrDefault(e.id),
      name: notEmptyStringOrDefault(e.nickname),
      contractors_subcontractors_count: (
        <AccountList
          id={numberOrDefault(e.id)}
          account={notEmptyStringOrDefault(e.nickname)}
          quantity={numberOrDefault(e.contractors_subcontractors_count)}
        />
      ),
      contractor_peoples_count: (
        <ResponsibleList
          id={numberOrDefault(e.id)}
          account={notEmptyStringOrDefault(e.nickname)}
          quantity={numberOrDefault(e.contractor_people_count)}
        />
      ),
    }
    return [...data, parsed]
  }, [])
}
