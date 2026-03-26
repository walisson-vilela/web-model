export type ContextProps<Name extends string = string> = {
  [K in 'isRequired' | 'isInvalid' | 'isViewMode' | 'isDisabled']: (
    name: Name,
  ) => boolean
}

export type FormProps<Name extends string = string> =
  React.HTMLAttributes<HTMLFormElement> & Partial<ContextProps<Name>>
