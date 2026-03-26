import axios from '../../../../../../../../services/Axios'

export const getHierarchiesOptions = async () => {
  const { data } = await axios.get(`/v1/tr/hierarchies/options`)

  if (!data.success) throw new Error('Invalid Request')

  return data
}
