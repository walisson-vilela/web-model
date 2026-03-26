import axios from '../../../../../services/Axios'

export const toggleStatus = async (
  status: 'A' | 'I' | 'E',
  ids: number[],
): Promise<any> => {
  const {
    data: { success },
  } = await axios.put(`/v1/tr/surveys/toggle-status/`, { ids, status })

  return success
}
