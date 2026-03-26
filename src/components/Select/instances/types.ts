import type { CommonSelectProps, SelectButtonProps } from '../types'

export type UseSelect<
  Props extends CommonSelectProps<unknown> = CommonSelectProps<unknown>,
> = (props: Props) => {
  placeholder: React.ReactNode
  isEmpty: boolean
  onClear: () => void
  Component: React.FunctionComponent<
    Props & {
      menuId: string
      onClose: () => void
    }
  >
  buttonProps: SelectButtonProps
}

export * from '../types'
