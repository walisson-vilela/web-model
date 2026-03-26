import Bullet from '../../../../../components/Bullet'
import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../utils/Formatters'
import { ResponsibleList } from '../../components'
import { TYPE_MASTER } from '../../constants'

import { BodyInterface, DataInterface } from './interfaces'
import { status as statusLabels } from './labels'

const parser = (data: DataInterface[]): BodyInterface[] => {
  return data.reduce<BodyInterface[]>((response, e) => {
    const status = booleanOrDefault(e.status, false) ? 1 : 0
    const parse: BodyInterface = {
      id: numberOrDefault(e.id),
      account_id: numberOrDefault(e.account_id),
      active: status,
      active_jsx: (
        <Bullet
          content={statusLabels[status].name}
          color={statusLabels[status].color}
        />
      ),
      casual_name: notEmptyStringOrDefault(e.nickname),
      account_type: notEmptyStringOrDefault(e.type_label),
      master: notEmptyStringOrDefault(e.type) === TYPE_MASTER,
      can_group: notEmptyStringOrDefault(e.shared ? e.shared_label : '-'),
      contractor_peoples_count: (
        <ResponsibleList
          id={numberOrDefault(e.id)}
          account={notEmptyStringOrDefault(e.nickname)}
          quantity={numberOrDefault(e.contractor_people_count)}
        />
      ),
    }
    return [...response, parse]
  }, [])
}

export default parser
