import { ThemeInterface } from '@mw-kit/mw-ui/types'

type KeyChecks = 'VALID' | 'INVALID' | 'UNKNOWN' | 'EMPTY' | 'UPDATED'

export const checkValues: {
  [k in KeyChecks]: { color: keyof ThemeInterface['colors'] | '#7666bb' }
} = {
  VALID: { color: 'lightGreen' },
  INVALID: { color: 'red' },
  UNKNOWN: { color: 'orange' },
  EMPTY: { color: 'warningGray' },
  UPDATED: { color: '#7666bb' },
}
