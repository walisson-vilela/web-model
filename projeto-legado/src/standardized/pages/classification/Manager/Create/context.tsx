import { createContext, useContext } from 'react'

import { Context } from './interfaces'

const FormContext = createContext({} as Context)

export const FormProvider: React.FunctionComponent<
  React.PropsWithChildren<{ value: Context }>
> = (props) => {
  return <FormContext.Provider {...props} />
}

const useFormContext = () => useContext(FormContext)

export default useFormContext
