export type PopupProps<T extends React.ElementType = 'div'> = {
  content: React.FunctionComponent
  placement: PopupPlacement
  on?: 'hover' | 'click'
  triggerType?: T
  triggerProps?: React.ComponentPropsWithRef<T>
  renderTrigger: (props: React.ComponentPropsWithRef<T>) => React.ReactNode
  offset?: number
  shift?: number
  background?: 'light' | 'dark'
  arrow?: 'flattened' | 'pointed' | 'none'
  closeOnClip?: boolean
  open?: boolean
  setOpen?: (open: boolean) => void
  fallbackPlacements?: PopupPlacement[]
  zIndex?: number
}

export type PopupPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
