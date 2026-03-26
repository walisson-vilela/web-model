import axios from '../../../../../../../../../services/Axios/instance'

export const getDone = async (): Promise<unknown[]> => {
  const params = {
    status: 'F',
    visualized: 0,
    visualize: 0,
  }

  const { data } = await axios.get('/v1/file-processes', { params })

  if (!data.success) throw new Error('Request returned no sucess!')
  if (!Array.isArray(data.data)) {
    throw new Error('Request returned an invalid data!')
  }

  return data.data
}

export const getInProgress = async (): Promise<unknown[]> => {
  const params = {
    status: 'P',
    visualize: 0,
  }

  const { data } = await axios.get('/v1/file-processes', { params })

  if (!data.success) throw new Error('Request returned no sucess!')
  if (!Array.isArray(data.data)) {
    throw new Error('Request returned an invalid data!')
  }

  return data.data
}

export const visualize = async (ids: number[]): Promise<void> => {
  const params = {
    id: ids.join(','),
  }

  const { data } = await axios.get('/v1/file-processes', { params })

  if (!data.success) throw new Error('Request returned no sucess!')
}
