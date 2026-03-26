import axios from '../../../../services/Axios'

export const saveModalChanges = async (
  id: number,
  items: any,
): Promise<any> => {
  const data = axios.put(`/v1/tr/surveys/edit/${id}`, { ...items })

  if (!data) throw new Error('Invalid Request')

  return data
}
