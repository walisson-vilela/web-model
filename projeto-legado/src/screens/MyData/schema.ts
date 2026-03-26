import * as yup from 'yup'

import { IntlTelInputValidator } from '../../components/IntlTelInput'
import { isValidEmail } from '../../utils/Validators'

const getSchema = () => {
  return yup.object({
    avatar: yup.string().nullable(),
    phone: IntlTelInputValidator(true),
    mobile_phone: IntlTelInputValidator(false),
    email: yup
      .string()
      .nullable()
      .test('email', (v) => !v || isValidEmail(v)),
  })
}

export default getSchema
