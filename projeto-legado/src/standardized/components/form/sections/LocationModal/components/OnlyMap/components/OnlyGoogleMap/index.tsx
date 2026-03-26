import { MwLoader } from '@mw-kit/mw-ui'

import OnlyMapGoogleMap from '../../../../../../../../../components/GoogleMap'
import { MarkerInterface } from '../../../../../../../../../components/GoogleMap/interfaces'
import { numberOrDefault } from '../../../../../../../../../utils/Formatters'
import { defaultCoordinates } from '../../../../constants'
import { Form, OnlyMapProps } from '../../../../interface'
import { useAuditMarker } from '../../hooks'

interface IMapsGoogle {
  values: [Form, React.Dispatch<React.SetStateAction<Form>>]
  propsMap: OnlyMapProps

  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  auditsEnabled: [number[], React.Dispatch<React.SetStateAction<number[]>>]
  auditsInfoWindows: [number[], React.Dispatch<React.SetStateAction<number[]>>]
}

const OnlyGoogleMap = (props: IMapsGoogle) => {
  const {
    propsMap,
    setLoading,
    auditsEnabled: [auditsEnabled],
    auditsInfoWindows: [auditsInfoWindows, setAuditsInfoWindows],
  } = props
  const [value, setValues] = props.values

  const onDragEnd = async (lat: number, lng: number) => {
    setLoading(true)

    try {
      setValues((prev) => ({ ...prev, lat, lng }))
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
  }

  return (
    <OnlyMapGoogleMap
      mode='satellite'
      markers={[
        {
          icon: 'user-white-green',
          lat: numberOrDefault(value.lat, defaultCoordinates.lat),
          lng: numberOrDefault(value.lng, defaultCoordinates.lng),
          onDragEnd: (_e: number, lat: number, lng: number) =>
            onDragEnd(lat, lng),
          circle: {
            radius: numberOrDefault(value.radius, defaultCoordinates.radius),
          },
          ...('bound' in propsMap && propsMap.bound?.radius !== undefined
            ? {
                bound: {
                  ...propsMap.bound,
                  radius: propsMap.bound.radius,
                },
              }
            : {}),
          draggable: true,
        },
        ...auditsEnabled
          .map((index) => {
            const audit = props.propsMap?.audits?.[index]
            if (!audit) return null
            const marker = useAuditMarker({
              audit,
              index,
              active: [
                auditsInfoWindows.includes(index),
                (v) => {
                  setAuditsInfoWindows((prev) => {
                    const pos = prev.findIndex((e) => e === index)
                    const current = pos > -1
                    const checked = typeof v === 'function' ? v(current) : v
                    if (current === checked) return prev

                    if (checked) {
                      return pos > -1 ? prev : [...prev, index]
                    }

                    if (pos < 0) return prev
                    const n = [...prev]
                    n.splice(pos, 1)
                    return n
                  })
                },
              ],
            })
            return marker
          })
          .filter((marker): marker is MarkerInterface => marker !== null),
      ]}
      containerStyles={{
        width: '100%',
        height: '100%',
      }}
      loadingElement={<MwLoader />}
    />
  )
}

export default OnlyGoogleMap
