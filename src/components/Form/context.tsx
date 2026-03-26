import type { ProviderProps } from 'react'
import React from 'react'

import type { ContextProps } from './types'

const defaultValue: ContextProps = {
  isRequired: () => false,
  isInvalid: () => false,
  isViewMode: () => false,
  isDisabled: () => false,
}

const Context = React.createContext<ContextProps>({ ...defaultValue })

const useContext = <Name extends string = string>(
  name: Name | undefined,
): { [K in keyof ContextProps]: () => boolean } => {
  const context = React.useContext(Context)

  return {
    isRequired: () => false,
    isInvalid: () => false,
    isViewMode: () => false,
    isDisabled: () => false,

    ...(name
      ? {
          isRequired: () => context.isRequired(name),
          isInvalid: () => context.isInvalid(name),
          isViewMode: () => context.isViewMode(name),
          isDisabled: () => context.isDisabled(name),
        }
      : {}),
  }
}

export const Provider = <Name extends string = string>(
  props: ProviderProps<Partial<ContextProps<Name>>>,
) => {
  return (
    <Context.Provider
      {...props}
      value={{ ...defaultValue, ...props.value } as ContextProps}
    />
  )
}

export default useContext
