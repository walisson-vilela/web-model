import * as yup from 'yup'

const schemaAuxForm = () => {
  return yup.object({
    interval: yup.boolean().required(),
    weekdays: yup.array().of(yup.number()).required(),

    starts_at: yup.string().required(),
    ends_at: yup.string().required(),
    name: yup.string().max(120).required(),
    start_limit: yup.string().required(),
    flag: yup.boolean().required(),
  })
}

export default schemaAuxForm
