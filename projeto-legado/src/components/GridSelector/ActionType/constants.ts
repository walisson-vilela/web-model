import * as Types from './types'

export const RULE_ONLY = 'ONLY'

export const RULE_EXCEPT = 'EXCEPT'

export const RULE_EMPTY = ''

export const RULES = [RULE_ONLY, RULE_EXCEPT, RULE_EMPTY] as const

export const labels: { [K in Types.Rule]: string } = {
  ONLY: 'Restringir',
  EXCEPT: 'Excluir',
  '': '',
}
