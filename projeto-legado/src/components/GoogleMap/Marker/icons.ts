import MarkerBlue from '../../../assets/icons/map/marker-blue.svg'
import MarkerCheckAttempt from '../../../assets/icons/map/marker-check-attempt.svg'
import MarkerCheckOk from '../../../assets/icons/map/marker-check-ok.svg'
import MarkerUserWhiteBlue from '../../../assets/icons/map/marker-user-white-blue.svg'
import MarkerUserWhiteGreen from '../../../assets/icons/map/marker-user-white-green.svg'
import MarkerYellow from '../../../assets/icons/map/marker-yellow.svg'

const icons: {
  [K in
    | 'blue'
    | 'user-white-green'
    | 'user-white-blue'
    | 'yellow'
    | 'check-attempt'
    | 'check-ok'
    | 'yellow']: {
    url: string
    position?: {
      x: number
      y: number
    }
  }
} = {
  blue: {
    url: MarkerBlue,
    position: {
      x: 16,
      y: 35,
    },
  },
  'user-white-green': {
    url: MarkerUserWhiteGreen,
    position: {
      x: 15,
      y: 40,
    },
  },
  'user-white-blue': {
    url: MarkerUserWhiteBlue,
    position: {
      x: 15,
      y: 40,
    },
  },
  yellow: {
    url: MarkerYellow,
    position: {
      x: 16,
      y: 35,
    },
  },
  'check-attempt': {
    url: MarkerCheckAttempt,
    position: {
      x: 14,
      y: 15,
    },
  },
  'check-ok': {
    url: MarkerCheckOk,
    position: {
      x: 14,
      y: 15,
    },
  },
}

export type MarkerIcon = keyof typeof icons

export default icons
