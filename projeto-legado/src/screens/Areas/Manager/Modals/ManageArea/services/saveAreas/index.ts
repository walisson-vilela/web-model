import axios from '../../../../../../../services/Axios/instance'
import { isObject } from '../../../../../../../standardized/utils/validators'
import { keys } from '../../../../../../../utils/Formatters'
import { Common, Selected } from '../../interface'

const saveAreas = async (selected: Selected, id: number): Promise<void> => {
  const payload = {
    details: keys(selected).reduce((details, foreign_table) => {
      const items = selected[foreign_table] as Common[]

      return [
        ...details,
        ...items.map((e) => {
          return e.id
            ? { id: e.id }
            : { foreign_table, foreign_id: e.foreign_id }
        }, []),
      ]
    }, []),
  }

  const { data: response } = await axios.put(`/v1/tr/regions/${id}`, payload)

  if (!isObject(response) || !response.success)
    throw new Error('Invalid Response')
}

export default saveAreas
