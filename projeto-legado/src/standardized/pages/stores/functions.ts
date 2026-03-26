import { isOneOf } from '../../../utils/Validators'
import { notEmptyStringOrDefault } from '../../utils/formatters'

import { SourceStatus } from './types'

export const sourceStatusOrDefault = <T = ''>(
  data: unknown,
  d: T,
): SourceStatus | T => {
  if (data === null) return null
  const status = notEmptyStringOrDefault(data)

  if (!status) return d

  if (isOneOf(status, ['VALID', 'UNKNOWN', 'INVALID', 'UPDATED'])) return status

  return d
}
