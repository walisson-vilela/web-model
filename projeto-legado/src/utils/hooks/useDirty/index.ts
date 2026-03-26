import { useCallback, useEffect, useState } from 'react'

import { GenericObject } from '@mw-kit/mw-ui/types'

import { keys } from '../../Formatters'
import { arrayEquals } from '../../Validators'

export type Comparator<Form extends GenericObject, K extends keyof Form> = (
  value: Form[K],
  original: Form[K],
) => boolean

export type Comparators<Form extends GenericObject> = Partial<{
  [K in keyof Form]: Comparator<Form, K>
}>

const useDirty = <Form extends GenericObject>(
  values: Form,
  originals: Form,
  comparators: Comparators<Form> = {},
): { dirty: boolean; fields: (keyof Form)[] } => {
  const getFields = useCallback(() => {
    return keys(values).reduce((fields, key) => {
      const compare = comparators[key] || ((v, o) => v != o)
      return [...fields, ...(compare(values[key], originals[key]) ? [key] : [])]
    }, [])
  }, [values, originals, comparators])

  const [fields, setFields] = useState<(keyof Form)[]>(getFields())

  useEffect(() => {
    const fields = getFields()
    setFields((prev) => {
      return arrayEquals(fields, prev) ? prev : fields
    })
  }, [getFields])

  return { dirty: fields.length > 0, fields }
}

export default useDirty
