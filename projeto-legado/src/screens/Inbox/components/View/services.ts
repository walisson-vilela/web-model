import axios from '../../../../services/Axios'

// Essa função irá fazer a requisição ou extração dos dados.
export const getMessage = async (id: number): Promise<any> => {
  const { data } = await axios.get(`/v1/tr/messages/${id}`)

  // Retornando o conteúdo do body da requisição
  return data
}

export const toggleImportant = async (
  is_important: boolean,
  ids: number[],
): Promise<boolean> => {
  const {
    data: { success },
  } = await axios.put('/v1/tr/messages/toggle-important', {
    is_important,
    ids,
  })

  return success
}

export const toggleVisualized = async (
  visualize: boolean,
  ids: number[],
): Promise<boolean> => {
  const {
    data: { success },
  } = await axios.put('/v1/tr/messages/toggle-visualized', {
    visualize,
    ids,
  })

  return success
}

export const togglePaused = async (
  paused: boolean,
  ids: number[],
): Promise<boolean> => {
  const {
    data: { success },
  } = await axios.put('/v1/tr/messages/toggle-paused', {
    paused,
    ids,
  })

  return success
}

export const deleteMultiple = async (ids: number[]): Promise<boolean> => {
  const {
    data: { success },
  } = await axios.delete('/v1/tr/messages/delete-multiple', {
    data: ids,
  })

  return success
}
