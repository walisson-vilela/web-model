import type { GenericObject, ReactNode } from '../../../../../interfaces'
import type {
  Option as MenuOption,
  MenuProps,
} from '../../../../Menu/interfaces'
import type { InputProps } from '../../Input/interfaces'

export type SelectOptionLabelProps<T extends GenericObject = GenericObject> = {
  value: string
  data: T
  disabled?: boolean
  mode?: 'placeholder'
}

export type SelectOptionLabelComponent<
  T extends GenericObject = GenericObject,
> = React.FunctionComponent<SelectOptionLabelProps<T>>

export type Option<T extends GenericObject = GenericObject> = Pick<
  MenuOption<T>,
  'onClick' | 'rules' | 'data' | 'disabled'
> & {
  label: ReactNode | SelectOptionLabelComponent<T>
  value: string
}

interface LoaderReturn<T extends GenericObject = GenericObject> {
  options: Option<T>[]
  lastPage: boolean
}

export type Loader<T extends GenericObject = GenericObject> = (
  search: string,
  page: number,
) => Promise<LoaderReturn<T> | Option<T>[] | null>

export type CommonProps<T extends GenericObject = GenericObject> = Omit<
  InputProps,
  | 'type'
  | 'mask'
  | 'icon'
  | 'setValue'
  | 'value'
  | 'onChange'
  | 'children'
  | 'clearable'
  | 'dirty'
> &
  Pick<
    MenuProps,
    'onScrollEnd' | 'position' | 'center' | 'maxHeight' | 'emptyContent'
  > & {
    search?: boolean
    /**
     * async function to load options
     *
     * returning null will keep loading, until the loader be called again (useful when aborting requests)
     */
    loader: Loader<T>
    initialLoader?: () => Option<T>[]
  }

interface BaseContext {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  searchInput: [string, React.Dispatch<React.SetStateAction<string>>]
}

export interface CommonContext<SelectProps extends CommonProps>
  extends BaseContext {
  props: SelectProps
  options: Option[]
}

export interface useSelectReturn {
  parsedOptions: MenuOption[]
  options: [Option[], React.Dispatch<React.SetStateAction<Option[]>>]
  inputContent: React.ReactNode
  onReset: () => void
  menu: Pick<MenuProps, 'itemSpacing' | 'before' | 'after' | 'maxHeight'>
  getContext: (base: BaseContext, children: JSX.Element) => JSX.Element
  onClear?: () => void
  dirty?: InputProps['dirty']
}

export type useSelect<Props extends CommonProps> = (
  props: Props,
  highlight: [number, React.Dispatch<React.SetStateAction<number>>],
  options: [Option[], React.Dispatch<React.SetStateAction<Option[]>>],
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
) => useSelectReturn
