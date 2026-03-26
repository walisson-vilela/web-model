import axios from '../../../../../../../../services/Axios'

export const GetColletData = async (id: number): Promise<any> => {
  const { data } = await axios.get(
    `/v1/tr/image-gallery/files/registries?file_id=${id}`,
  )
  if (!data.success) throw new Error('Invalid Request')
  return data.data
}

export const exportPdfFile = async (fileId: number): Promise<any> => {
  let params: any = {}

  if (fileId) {
    params.file_id = fileId
  }
  const { data } = await axios.get('v1/tr/image-gallery/files/registries.pdf', {
    params,
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/pdf',
    },
  })

  return data
}
