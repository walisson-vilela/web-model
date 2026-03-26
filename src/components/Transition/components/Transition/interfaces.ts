export interface TransitionOptions {
  active: boolean
  mountDuration: number
}

export interface TransitionProps extends TransitionOptions {
  element: (options: TransitionOptions) => JSX.Element
}
