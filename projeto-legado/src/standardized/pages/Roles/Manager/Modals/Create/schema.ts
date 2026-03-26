import * as yup from 'yup'

const buildSchema = yup.object().shape({
  name: yup.string().required('O campo name é obrigatório'),
  access_level_id: yup
    .number()
    .required('O campo access_level_id é obrigatório')
    .integer('O campo access_level_id deve ser um número inteiro')
    .min(1, 'O campo access_level_id deve ser no mínimo 1')
    .max(3, 'O campo access_level_id deve ser no máximo 3'),

  internal_access: yup
    .boolean()
    .required('O campo internal_access é obrigatório'),

  hierarchies: yup
    .array()
    .of(
      yup.object().shape({
        id: yup
          .number()
          .nullable()
          .integer('O campo id deve ser um número inteiro'),
        hierarchy_id: yup
          .number()
          .required('O campo hierarchy_id é obrigatório')
          .integer('O campo hierarchy_id deve ser um número inteiro'),
        name: yup.string().required('O campo name é obrigatório'),
        hierarchy_structure_id: yup
          .number()
          .nullable()
          .integer('O campo hierarchy_structure_id deve ser um número inteiro'),
      }),
    )
    .required('O campo hierarchies é obrigatório')
    .min(1, 'O campo hierarchies deve conter no mínimo 1 item'),
})

export default buildSchema
