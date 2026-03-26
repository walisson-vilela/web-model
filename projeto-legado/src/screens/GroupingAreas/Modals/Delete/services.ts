import axios from '../../../../services/Axios/instance'

export const deleteMultiple = async (ids: string[]): Promise<boolean> => {
  const {
    data: { success },
  } = await axios.delete('/v1/tr/grouping-areas/delete-multiple', {
    data: { ids },
  })

  return success
}
