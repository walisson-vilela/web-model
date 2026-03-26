import * as yup from 'yup'

const getSchema = () => {
  return yup.object({
    password: yup.string().required(),
    password_confirm: yup
      .string()
      .required()
      .when('password', ([password], schema) => {
        return schema.equals(
          [password],
          'A repetição não confere com a senha inicial',
        )
      }),
  })
}

export default getSchema
