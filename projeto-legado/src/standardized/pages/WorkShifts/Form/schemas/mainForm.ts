import * as yup from 'yup'

const schemaMainForm = () => {
  return yup.object({
    electronic_point: yup.boolean().required(),
    tolerance_before: yup.number().required(),
    tolerance_after: yup.number().required(),

    weekdays: yup
      .array()
      .of(
        yup.object().shape({
          weekday: yup.number().required(),
          weekday_label: yup.string().required(),
          starts_at: yup.string().required(),
          ends_at: yup.string().required(),

          intervals: yup
            .array()
            .of(
              yup.object().shape({
                starts_at: yup.string().required(),
                ends_at: yup.string().required(),
                name: yup.string().required(),
                start_limit: yup.string().required(),
                flag: yup.boolean().required(),
              }),
            )
            .required('Required'),
        }),
      )
      .required('Required'),
  })
}

export default schemaMainForm
