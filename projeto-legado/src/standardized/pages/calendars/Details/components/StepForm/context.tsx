import React from 'react'

import type { GenericObject } from '@mw-kit/mw-ui/types'

import type * as Types from './types'

const FormContext = React.createContext({} as Types.FormContext<object, string>)

type ProviderType<
  Value extends GenericObject,
  Step extends string,
> = React.Context<Types.FormContext<Value, Step>>['Provider']

export const Provider = <Value extends GenericObject, Step extends string>(
  props: Parameters<ProviderType<Value, Step>>[0],
): ReturnType<ProviderType<Value, Step>> => {
  return (
    <FormContext.Provider
      {...(props as never as Parameters<ProviderType<object, string>>[0])}
    />
  )
}

const useFormContext = <Value extends GenericObject, Step extends string>() =>
  React.useContext(FormContext) as never as Types.FormContext<Value, Step>

export default useFormContext
