import axios from '../../../../../../services/Axios'

export const getData = async (devideId: number): Promise<any> => {
  const params = { contain: 'CollectedRegistries,BatteryLevels' }
  const { data } = await axios.get(`/v1/devices/view/${devideId}`, { params })

  if (!data.success) throw new Error('Invalid request!')

  return data.data
}
