import { arrayEquals } from '../../../../../utils/Validators'
import { Comparator, Comparators } from '../../../../../utils/hooks/useDirty'

import { Form } from './types'

const associated_users: Comparator<Form, 'associated_users'> = (v, o) => {
  return !arrayEquals(
    v,
    o,
    (x, y) =>
      x.person_id === y.person_id &&
      x.administrator === y.administrator &&
      x.menu_ids.length === y.menu_ids.length &&
      !x.menu_ids.some((x) => !y.menu_ids.some((y) => y === x)),
  )
}

const group_associated: Comparator<Form, 'group_associated'> = (v, o) => {
  return !arrayEquals(v, o, (x, y) => x.subcontractor_id === y.subcontractor_id)
}

const comparators: Comparators<Form> = {
  associated_users,
  group_associated,
}

export default comparators
