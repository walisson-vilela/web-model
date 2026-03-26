import { useCallback } from 'react'

import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

import { isSetStateFunction } from '../../Validators'

const voidTrigger = async () => true

type HookFormsAsStateProps<T extends FieldValues> = Pick<
  UseFormReturn<T>,
  'watch' | 'setValue'
> & {
  setValueOptions?: Parameters<UseFormReturn<T>['setValue']>[2]
} & (
    | {}
    | ({
        forceTrigger: true
      } & Pick<UseFormReturn<T>, 'trigger'>)
  )

const useHookFormsAsState = <T extends FieldValues, N extends Path<T>>(
  name: N,
  props: HookFormsAsStateProps<T>,
): [T[N], React.Dispatch<React.SetStateAction<T[N]>>] => {
  const { watch, setValue, setValueOptions } = props

  const trigger = 'forceTrigger' in props ? props.trigger : voidTrigger

  const state = watch(name) as T[N]
  const setState: React.Dispatch<React.SetStateAction<T[N]>> = useCallback(
    (value) => {
      if (isSetStateFunction(value)) {
        const newState = value(state)
        if (newState !== state) setValue(name, newState, setValueOptions)
      } else {
        setValue(name, value, setValueOptions)
      }
      trigger(name)
    },
    [state, setValueOptions, trigger],
  )

  return [state, setState]
}

export default useHookFormsAsState
