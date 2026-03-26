import type { GenericObject } from '../../../../../../interfaces'
import type { CommonContext, CommonProps, Option } from '../interfaces'

export interface SelectProps<T extends GenericObject = GenericObject>
  extends CommonProps<T> {
  /** @deprecated use MwSelect instead */
  type: 'select'
  name?: string
  setValue: (value: string, option: Option<T>['data']) => void
  onClear?: (value: '') => void
  value: string | Pick<Option<T>, 'value' | 'data' | 'label'>
  dirty?: (() => void) | Pick<Option<T>, 'value' | 'data'>
}

export type ContextInterface = CommonContext<SelectProps>

export * from '../interfaces'
