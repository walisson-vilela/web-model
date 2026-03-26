import GoogleMap from '../../../../../../../../../components/GoogleMap'
import { numberOrDefault } from '../../../../../../../../../utils/Formatters'
import { defaultCoordinates } from '../../../../constants'
import { useWithFormContext } from '../../context'
import * as S from '../../styled'

const MapForm = () => {
  const {
    form,
    onDragEnd,
    polygon: [polygon],
  } = useWithFormContext()

  const { watch } = form

  const coordinates = {
    lat: numberOrDefault(watch('lat')),
    lng: numberOrDefault(watch('lng')),
  }

  return (
    <GoogleMap
      mode='roadmap'
      markers={
        coordinates.lat !== null && coordinates.lng !== null
          ? {
              lat: coordinates.lat,
              lng: coordinates.lng,
              onDragEnd: (_e, lat, lng) => onDragEnd(lat, lng),
              icon: 'user-white-green',
              circle: {
                radius: numberOrDefault(
                  watch('radius'),
                  defaultCoordinates.radius,
                ),
              },
              draggable: true,
            }
          : undefined
      }
      {...(polygon ? { polygons: [{ path: polygon }] } : {})}
      containerStyles={{
        width: '100%',
        height: '100%',
      }}
      loadingElement={<S.Map />}
    />
  )
}

export default MapForm
