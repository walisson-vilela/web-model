import { FieldValues, UseFormReturn as UseForm } from 'react-hook-form'

/** fixes reset method because it has not been typed as an async method, even though it is */
export type UseFormMethods<TFieldValues extends FieldValues = FieldValues> =
  Omit<UseForm<TFieldValues>, 'reset'> & {
    reset: (
      ...args: Parameters<UseForm<TFieldValues>['reset']>
    ) => Promise<ReturnType<UseForm<TFieldValues>['reset']>>
  }
