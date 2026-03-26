import axios from '../../../../../services/Axios'
import { notEmptyStringOrDefault } from '../../../../../utils/Formatters'
import { isObject } from '../../../../../utils/Validators'

const generatePassword = async (): Promise<string> => {
  const { data: response } = await axios.get('v1/tr/users/random-password')
  if (!isObject(response) || !response.success || !isObject(response.data)) {
    throw new Error('Invalid response')
  }

  const password = notEmptyStringOrDefault(response.data.password)
  if (!password) {
    throw new Error('Invalid response')
  }

  return password
}

export default generatePassword
