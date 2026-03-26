import { Position } from './types'

export const getPosition = (ref: { x: number; y: number }): Position => {
  const width = window.innerWidth
  const height = window.innerHeight
  const x = (ref.x * 100) / width
  const y = (ref.y * 100) / height

  const response: Position = {}

  if (x > 50) {
    response.right = 100 - x
  } else {
    response.left = x
  }

  if (y > 50) {
    response.bottom = 100 - y
  } else {
    response.top = y
  }

  return response
}
