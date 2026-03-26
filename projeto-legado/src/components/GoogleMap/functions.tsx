import { Circle, CircleProps } from '@react-google-maps/api'

import COLORS from './Marker/colors'
import { CircleInterface } from './interfaces'

const setDefaults = (obj: Object, defaults: Object) => {
  Object.keys(defaults).map((key) => {
    if (!(key in obj)) obj[key] = defaults[key]
  })

  return obj
}

export const getCircle = (
  circle: Pick<CircleProps, 'radius' | 'options'> | undefined,
  lat: number,
  lng: number,
  defaultColor: string = COLORS.GREEN,
): JSX.Element | null => {
  if (!circle) return null

  const { radius } = { ...circle }

  const defaults: CircleInterface['options'] = {
    strokeColor: defaultColor,
    strokeWeight: 2,
    fillColor: defaultColor,
  }

  const options = circle.options
    ? setDefaults(circle.options, defaults)
    : defaults

  return <Circle center={{ lat, lng }} radius={radius} options={options} />
}
