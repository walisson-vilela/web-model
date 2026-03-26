import axios from '../../../../../../services/Axios/instance'
import { isObject } from '../../../../../../standardized/utils/validators'
import { Selected } from '../../interface'

const saveAreas = async (selected: Selected, id: string): Promise<void> => {
  const payload = {
    details: selected.map((e) => {
      return { region_id: e.foreign_id }
    }, []),
  }

  const { data: response } = await axios.put(
    `/v1/tr/grouping-areas/${id}`,
    payload,
  )

  if (!isObject(response) || !response.success) {
    throw new Error('Invalid Response')
  }
}

export default saveAreas
