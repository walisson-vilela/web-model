import { loader } from '../functions'

import { parseTeams } from './parsers'
import type { Config, Team } from './types'

export const getTeamsOptions: Config['loader'] = async (
  by_user,
  internal_access,
  config,
) => {
  return loader(
    '/v1/tr/hierarchy-elements/options',
    { ...config, params: { by_user, sort: 'name' } },
    (data: unknown[]): Team[] => parseTeams(data),
  )
}
