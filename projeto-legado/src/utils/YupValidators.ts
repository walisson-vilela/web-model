import * as yup from 'yup'

import { numberOrDefault } from './Formatters'
import { isNumber } from './Validators'

type SchemaCallback<T> = (schema: T) => T

type NumberCallback = SchemaCallback<
  yup.NumberSchema<number, yup.AnyObject, undefined, ''>
>

type GeneralCallback = SchemaCallback<yup.AnySchema>

const numberOrEmptyString = (
  options: {
    number?: NumberCallback
    general?: GeneralCallback
  } = {},
) => {
  const numberCallback: NumberCallback = options.number || ((schema) => schema)
  const generalCallback: GeneralCallback =
    options.general || ((schema) => schema)

  return yup.lazy((value) => {
    const schema =
      !value && !isNumber(value)
        ? yup.string().max(0)
        : numberCallback(
            yup.number().transform((_v, o) => {
              return numberOrDefault(o, o)
            }),
          )

    return generalCallback(schema) as
      | yup.NumberSchema<number, yup.AnyObject, undefined, ''>
      | yup.StringSchema<string, yup.AnyObject, undefined, ''>
  })
}

const yupValidators = {
  numberOrEmptyString,
}

export default yupValidators
