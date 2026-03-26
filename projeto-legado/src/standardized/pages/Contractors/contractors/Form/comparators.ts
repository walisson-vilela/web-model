import { keys } from '../../../../../utils/Formatters'
import { arrayEquals, isObject } from '../../../../../utils/Validators'
import { Comparator, Comparators } from '../../../../../utils/hooks/useDirty'

import { PPT_TEMPLATES } from './constants'
import { Form } from './types'

const responsibleAccount: Comparator<Form, 'responsibleAccount'> = (v, o) => {
  return !arrayEquals(v, o, (x, y) => x.id === y.id)
}

const user_associated: Comparator<Form, 'user_associated'> = (v, o) => {
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

const termsOfUse: Comparator<Form, 'termsOfUse'> = (v, o) => {
  return !arrayEquals(v, o, (x, y) => x.term === y.term)
}

const privacyPolicy: Comparator<Form, 'privacyPolicy'> = (v, o) => {
  return !arrayEquals(v, o, (x, y) => x.term === y.term)
}

const forms: Comparator<Form, 'forms'> = (v, o) => {
  return !arrayEquals(v, o, (x, y) => x.id === y.id)
}

const licenses: Comparator<Form, 'licenses'> = (v, o) => {
  if (v === null && o === null) return false
  if (v === null || o === null) return true

  const [x, y] = [keys(v.values), keys(o.values)]
  return (
    !arrayEquals(x, y, (x, y) => x === y) ||
    x.some((k) => {
      const x = v.values[k]
      const y = o.values[k]
      return x.value !== y.value
    })
  )
}

const occupationArea: Comparator<Form, 'occupationArea'> = (v, o) => {
  if ((v === null || v.length === 0) && (o === null || o.length === 0)) {
    return false
  }

  return Array.isArray(v) && Array.isArray(o)
    ? !arrayEquals(v, o, (x, y) => x === y)
    : v !== o
}

const ppt_templates: Comparator<Form, 'ppt_templates'> = (v, o) => {
  if (v === null && o === null) return false
  return isObject(v) && isObject(o)
    ? !arrayEquals(
        keys(PPT_TEMPLATES),
        keys(PPT_TEMPLATES),
        (x, y) =>
          v[x].color.toUpperCase() === o[y].color.toUpperCase() &&
          v[x].url === o[y].url,
      )
    : v !== o
}

const comparators: Comparators<Form> = {
  responsibleAccount,
  user_associated,
  termsOfUse,
  privacyPolicy,
  forms,
  licenses,
  occupationArea,
  ppt_templates,
}

export default comparators
