import type React from 'react'

import type { ReactVirtualizerOptions } from '@tanstack/react-virtual'

export type SelectOptionsLoader<Option> = (
  search: string,
  page: number,
  cursor: Option | null,
) => Promise<{ options: Option[]; last: boolean } | null>

export type SelectOptionsFinder<Option> = (
  search: string,
  options: Option[],
) => Option[]

export type SelectKeyBuilder<Option> = (option: Option) => string

export type SelectRuleComponent<Option> = React.FunctionComponent<{
  option: Option
}>

export type SelectRule<Option, Id extends string = string> = {
  id: Id
  allow: (option: Option) => boolean
  Component?: SelectRuleComponent<Option>
}

export type SelectRules<T> = readonly SelectRule<T, string>[]

export type SelectApplyRuleComponent<Option> = React.FunctionComponent<{
  value: Option[]
}>

export type SelectApplyRule<Option, Id extends string = string> = {
  id: Id
  allow: (option: Option[]) => boolean
  Component?: SelectApplyRuleComponent<Option>
}

export type SelectApplyRules<T> = readonly SelectApplyRule<T, string>[]

export type SelectOptionComponent<Option> = React.FunctionComponent<{
  option: Option
  isActive: boolean
  isSelected: boolean
  isDisabled: boolean
}>

export type SelectButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  | 'type'
  | 'value'
  | 'role'
  | 'aria-haspopup'
  | 'aria-expanded'
  | 'aria-controls'
  | 'aria-readonly'
  | 'aria-invalid'
  | 'aria-required'
>

export type CommonSelectProps<Option> = SelectButtonProps & {
  label?: React.ReactNode
  loader: SelectOptionsLoader<Option>
  getKey: SelectKeyBuilder<Option>
  OptionComponent: SelectOptionComponent<Option>
  rules?: SelectRules<Option>
  placeholder?: string
  required?: boolean
  invalid?: boolean
  clearable?: boolean
  readOnly?: boolean
  viewMode?: boolean
  /**
   * The number of items to render above and below the visible area.
   * The default is 2.
   * @see https://tanstack.com/virtual/latest/docs/api/virtualizer#overscan
   */
  overscan?: ReactVirtualizerOptions<Element, Element>['overscan']

  /**
   * This function is passed the index of each item and should return the actual size (or estimated size if you will be dynamically measuring items with virtualItem.measureElement) for each item.
   * The default is 46.
   * @see https://tanstack.com/virtual/latest/docs/api/virtualizer#estimatesize
   */
  estimateSize?:
    | ReactVirtualizerOptions<Element, Element>['estimateSize']
    | number

  height?: number
}

export type SelectSingleProps<Option> = CommonSelectProps<Option> & {
  value: Option | null
  setValue: (value: Option | null) => void
  ValueComponent?: SelectOptionComponent<Option>
}

export type SelectMultiProps<Option> = CommonSelectProps<Option> & {
  value: Option[]
  setValue: (value: Option[]) => void
  finder: SelectOptionsFinder<Option>
  applyRules?: SelectApplyRules<Option>
}

export type SelectProps<Option> =
  | ({
      type: 'single-select'
    } & SelectSingleProps<Option>)
  | ({
      type: 'multi-select'
    } & SelectMultiProps<Option>)
