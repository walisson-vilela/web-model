import axios from '../../services/Axios'

export const deleteMultiple = async (ids: number[]): Promise<boolean> => {
  const {
    data: { success },
  } = await axios.delete('/v1/tr/markets/delete-ids', {
    data: { ids },
  })

  return success
}

export const toggleStatus = async (
  active: boolean,
  ids: number[],
): Promise<boolean> => {
  const {
    data: { success },
  } = await axios.put('/v1/tr/markets/toggle-status', {
    active: active ? 1 : 0,
    ids,
  })

  return success
}
