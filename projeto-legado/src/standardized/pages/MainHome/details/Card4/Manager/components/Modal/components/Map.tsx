import { useMemo } from 'react'

import GoogleMap from '../../../../../../../../../components/GoogleMap'

type Props = {
  type: 'check_in' | 'check_out'
}

export const Map = (props: Props) => {
  const { type } = props

  const markers = useMemo(() => {
    return [
      {
        lat: -19.9394,
        lng: -43.993,
        circle: { radius: 300 },
      },
      {
        lat: type === 'check_in' ? -19.9431 : -19.9417,
        lng: type === 'check_in' ? -43.9991 : -43.9953,
        icon: 'check-ok' as const,
        circle: {
          radius: 120,
          options: { fillColor: '#66BB6A', strokeColor: '#66BB6A' },
        },
      },
    ]
  }, [type])

  return (
    <div style={{ width: '100%', height: 273 }}>
      <GoogleMap
        markers={markers}
        containerStyles={{ width: '100%', height: '273px' }}
        hideUI
        defaultOptions={{ gestureHandling: 'none' }}
      />
    </div>
  )
}
