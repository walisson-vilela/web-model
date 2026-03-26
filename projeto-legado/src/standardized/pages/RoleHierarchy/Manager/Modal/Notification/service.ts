import moment from 'moment'

import axios from '../../../../../../services/Axios'
import { Level } from '../../../types'

export const createPrograming = async (
  hierarchy_id: number,
  progamingDate: moment.Moment,

  manual_elements: boolean,
  levels: Level[],
) => {
  const payload = {
    schedule: `${progamingDate.format('YYYY-MM-DD')} 00:00:00`,
    manual_elements,
    structure: levels.map((level) => ({
      name: level.name,
      roles: level.roles.map((role) => role.id),
    })),
  }

  await axios.post(`v1/tr/hierarchies/${hierarchy_id}/structures`, payload)
}
