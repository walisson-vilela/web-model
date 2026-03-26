import axios from '../../../../services/Axios'

export const save = async (id: number, approve: boolean): Promise<any> => {
  const params = [id]

  const { data } = await axios.put(
    `/v1/file-imports/${approve ? 'approve' : 'disapprove'}`,
    params,
  )

  return data
}
