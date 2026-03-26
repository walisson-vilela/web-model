import { UseFormReturn } from 'react-hook-form'

import { keys } from '../../../../../../../utils/Formatters'
import useDelayCallback from '../../../../../../../utils/hooks/useDelayCallback'
import { notEmptyString } from '../../../../../../utils/validators'
import { ContextProps } from '../../context'
import { IAddress } from '../../interfaces'
import { requestParser } from '../../parser'
import { addressSchema } from '../../schema'

import { getCoordinatesByAddress } from './services'

type Props = {
  setLoading: React.Dispatch<
    React.SetStateAction<{
      postalCode: boolean
      coordinates: boolean
    }>
  >
} & { form: UseFormReturn<IAddress> }

const useCoordinatesLoader = (props: Props) => {
  const {
    setLoading,
    form: { setValue },
  } = props

  const loadCoordinates: ContextProps['loadCoordinates'] = async (form) => {
    setLoading((prev) => ({ ...prev, coordinates: true }))

    try {
      const fields = [
        'postal_code',
        'street_address',
        'sublocality',
        'city',
        'state',
        'street_number',
      ] as const

      await addressSchema.pick(fields).validate(form, { abortEarly: false })

      if (fields.some((f) => !notEmptyString(form[f as keyof IAddress]))) {
        throw new Error('Invalid address')
      }
    } catch (e) {
      setLoading((prev) => ({ ...prev, coordinates: false }))
      return
    }

    try {
      const response = await getCoordinatesByAddress(form)

      const data = requestParser({ ...form, ...response })

      const parsed = {
        ...data,
        lat: response.lat,
        lng: response.lng,
        address_lat: response.lat,
        address_lng: response.lng,
      }

      keys(parsed).forEach((key) => {
        setValue(key, parsed[key])
      })
    } catch (e) {
      setValue('lat', null)
      setValue('lng', null)
      setValue('address_lat', null)
      setValue('address_lng', null)
      setValue('geolocation_at', null)
      setValue('geolocation_by_id', null)
      setValue('geolocation_by_name', null)
      setValue('geolocation_status', null)

      console.error(e)
    } finally {
      setLoading((prev) => ({ ...prev, coordinates: true }))
    }
  }

  const loadCoordinatesWithDelay = useDelayCallback(
    loadCoordinates,
    1000,
    () => {
      setValue('lat', null)
      setValue('lng', null)
      setValue('address_lat', null)
      setValue('address_lng', null)
      setValue('geolocation_at', null)
      setValue('geolocation_by_id', null)
      setValue('geolocation_by_name', null)
      setValue('geolocation_status', null)
    },
  )

  return loadCoordinatesWithDelay
}

export default useCoordinatesLoader
