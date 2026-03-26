import type { GenericObject } from '../../../../../../interfaces'
import type { CommonContext, CommonProps, Option } from '../interfaces'

import type { Limits } from './utils'

export interface SelectProps<T extends GenericObject = GenericObject>
  extends CommonProps<T> {
  /** @deprecated use MwSelect instead */
  type: 'select-multiple'
  setValue: (value: string[], data: Option<T>['data'][]) => void
  value: (Pick<Option<T>, 'value' | 'data'> | string)[]
  selectAll?: boolean
  dirty?: (() => void) | Pick<Option<T>, 'value' | 'data'>[]
  minSelected?: number
  maxSelected?: number
}

export interface ContextInterface extends CommonContext<SelectProps> {
  checked: [
    Pick<Option, 'value' | 'data'>[],
    React.Dispatch<React.SetStateAction<Pick<Option, 'value' | 'data'>[]>>,
  ]
  limits: Limits
}

export * from '../interfaces'
