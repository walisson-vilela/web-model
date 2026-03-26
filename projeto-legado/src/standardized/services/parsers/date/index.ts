import moment from 'moment'

const date = <Default = null>(
  value: unknown,
  def = null as Default,
  input = 'YYYY-MM-DD HH:mm:ss',
  output = 'YYYY-MM-DD HH:mm:ss',
): string | Default => {
  const date = moment(value as string, input)
  return date.isValid() ? date.format(output) : def
}

export default date
