import useMultiSelect from './multi'
import useSingleSelect from './single'
import type {
  SelectMultiProps,
  SelectProps,
  SelectSingleProps,
  UseSelect,
} from './types'

const useSelect = ({ type, ...props }: SelectProps<unknown>) => {
  return (
    type === 'multi-select'
      ? useMultiSelect(props as SelectMultiProps<unknown>)
      : useSingleSelect(props as SelectSingleProps<unknown>)
  ) as ReturnType<UseSelect>
}

export default useSelect
