import axios from '../../../../../services/Axios'
import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../utils/Formatters'
import { isObject } from '../../../../../utils/Validators'
import { PasswordRule } from '../../interfaces'

type PasswordRuleLabelSpliter = (label: string) => string[]

const passwordRuleLabelSpliter: {
  [key in 'SPECIAL_CHAR']: PasswordRuleLabelSpliter
} = {
  SPECIAL_CHAR: (label) => {
    const parsed = label.split('(')
    return [
      parsed[0],
      ...(parsed.length > 1 ? [`(${parsed.slice(1).join('(')}`] : []),
    ]
  },
}

const checkPassword = async (
  password: string,
): Promise<{
  data: PasswordRule[]
  frequency: number
}> => {
  const { data: response } = await axios.post('/v1/tr/users/check-password', {
    password,
  })

  if (!isObject(response) || !Array.isArray(response.data)) {
    throw new Error('Invalid response')
  }

  const data = response.data.reduce<PasswordRule[]>((data, e) => {
    if (!isObject(e)) return data

    const parsed: PasswordRule = {
      code: notEmptyStringOrDefault(e.code, ''),
      label: [],
      success: booleanOrDefault(e.success, false),
    }

    const spliter: PasswordRuleLabelSpliter =
      passwordRuleLabelSpliter[parsed.code] || ((label) => [label])
    parsed.label = spliter(notEmptyStringOrDefault(e.label, ''))

    return [...data, parsed]
  }, [])

  const frequency = isObject(response.params)
    ? numberOrDefault(response.params.frequency, 0)
    : 0

  return {
    data,
    frequency,
  }
}

export default checkPassword
