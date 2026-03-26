import { object, string } from 'yup'

const schema = object().shape({
  status: string().oneOf(['A', 'I']).required(),
})

export default schema
