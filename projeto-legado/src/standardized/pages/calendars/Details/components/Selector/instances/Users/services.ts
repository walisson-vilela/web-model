import { loader } from '../functions'

import { parseUsers } from './parsers'
import type { Config, User } from './types'

export const getUsersOptions: Config['loader'] = async (
  by_user,
  internal_access,
  config,
) => {
  return loader(
    'v1/tr/users/options',
    {
      ...config,
      params: {
        by_user,
        internal_access,
      },
    },
    (data: unknown[]): User[] => parseUsers(data),
  )
}
