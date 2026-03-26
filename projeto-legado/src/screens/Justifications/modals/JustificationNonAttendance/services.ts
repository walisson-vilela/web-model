import axios from '../../../../services/Axios'

export const GetUserInfo = async (id: number): Promise<any> => {
  const { data } = await axios.get(`v1/tr/justifies/${id}`)
  if (!data.success) throw new Error('Invalid Request')
  return data.data
}

export const GetJustifyTypes = async (): Promise<any> => {
  const { data } = await axios.get(`v1/justify-types`)
  return data.data
}

export const EditData = async (
  id: number,
  formData: FormData,
): Promise<any> => {
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  }

  const { data } = await axios.post(`/v1/tr/justifies/edit/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  if (!data.success) throw new Error('Invalid Request')
  return data.data
}

export const GetStoreImpacted = async (
  id: number,
  search: string,
): Promise<any> => {
  let params: any = {}
  if (search.length > 0) {
    params.q = search
  }
  const { data } = await axios.get(`/v1/tr/justifies/${id}/stores`, { params })

  if (!data.success) throw new Error('Invalid Request')
  return data.data
}

export const ChangeToReview = async (
  justifyId: number,
  auditId: string,
): Promise<any> => {
  const { data } = await axios.delete(
    `/v1/tr/justifies/${justifyId}/audits/${auditId}`,
  )

  if (!data.success) throw new Error('Invalid Request')
  return data.data
}
