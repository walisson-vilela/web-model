import axios from '../../../../../../../services/Axios'
import { numberOrDefault } from '../../../../../../../utils/Formatters'
import { notEmptyStringOrDefault } from '../../../../../../utils/formatters'
import { isObject } from '../../../../../../utils/validators'
import { IAddress } from '../../interfaces'

export const getCoordinatesByAddress = async (
  payload: Partial<IAddress>,
): Promise<
  Pick<
    Required<IAddress>,
    | 'lat'
    | 'lng'
    | 'geolocation_at'
    | 'geolocation_by_id'
    | 'geolocation_by_name'
  >
> => {
  const user = JSON.parse(localStorage.getItem('_GIV_LOGIN') || '{}')
  if (!isObject(user)) {
    throw new Error('Could not get logged user')
  }

  const geolocation_by_id = numberOrDefault(user.id)
  if (!isObject(user)) {
    throw new Error('Could not get logged user')
  }

  const { data: response } = await axios.post(
    'addresses/coordinates',
    payload,
    {
      params: { provider: 'google' },
    },
  )

  if (!isObject(response) || !isObject(response.data)) {
    throw new Error('Request returned an invalid data')
  }

  if (!response.success) {
    throw new Error('Request returned no success!')
  }

  const lat = numberOrDefault(response.data.lat)
  const lng = numberOrDefault(response.data.lng)

  if (!lat || !lng) {
    throw new Error('Request returned an invalid data')
  }

  return {
    lat,
    lng,
    geolocation_at: new Date().toISOString(),
    geolocation_by_id,
    geolocation_by_name: notEmptyStringOrDefault(user.name, ''),
  }
}
