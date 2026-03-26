import { keys } from '../../../../../utils/Formatters'
import { arrayEquals } from '../../../../../utils/Validators'
import { Comparator, Comparators } from '../../../../../utils/hooks/useDirty'

import { Hierarchies } from './types'

type Form = { hierarchies: Hierarchies }

const hierarchies: Comparator<Form, 'hierarchies'> = (v, o) => {
  if (v === null && o === null) return false
  if (v === null || o === null) return true

  const [x, y] = [keys(v), keys(o)]
  return (
    !arrayEquals(x, y) ||
    x.some((k) => {
      const x = v[k]
      const y = o[k]
      return (
        !arrayEquals(x.regions, y.regions) || !arrayEquals(x.states, y.states)
      )
    })
  )
}

const comparators: Comparators<Form> = {
  hierarchies,
}

export default comparators
