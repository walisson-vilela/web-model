import * as yup from 'yup'

const getSchema = () => {
  return yup.object({
    // status
    active: yup.number().min(0).max(1),

    // avatar
    avatar: yup.string(),

    // basic data
    name: yup.string().required(), // nome de identificacao do PDV

    allocated_users: yup.string(),

    group_associated: yup.array().min(1).required(),
  })
}

export default getSchema
