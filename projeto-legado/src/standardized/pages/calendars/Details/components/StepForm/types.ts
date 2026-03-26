import type { MwButton } from '@mw-kit/mw-ui'
import type { GenericObject } from '@mw-kit/mw-ui/types'

import type { Comparators } from '../../../../../../utils/hooks/useDirty'
import type { ReactState } from '../../types'
import type { FooterButtonProps } from '../Modal/types'

export type Errors<Value extends GenericObject> = Partial<{
  [Field in keyof Value]: {
    code: string
    message: string
  }
}>

export type StepComponentComponent = React.VoidFunctionComponent
export type StepComponentAttributes<Value extends GenericObject> = {
  title: string
  validator: (
    value: Value,
    errors: Errors<Value>,
  ) => boolean | FooterButtonProps
  button?: Parameters<typeof MwButton>[0]
}

export type StepComponent<Value extends GenericObject> =
  StepComponentComponent & StepComponentAttributes<Value>

export type SaveCallback<Value extends GenericObject> = (context: {
  card_id?: number
  close: () => void
  value: Value
  dirtyFields: (keyof Value)[]
  errors: Errors<Value>
}) => Promise<{ success: true } | { success: false; errors: GenericObject }>

export type FormProps<Value extends GenericObject, Step extends string> = {
  card_id?: number
  close: () => void
  value: ReactState<Value>
  dirty?: {
    originals?: Value
    comparators?: Comparators<Value>
  }
  errors?: ReactState<Errors<Value>>
  steps: { [key in Step]: StepComponent<Value> }
  save: SaveCallback<Value>
  loading: ReactState<boolean>
}

export type FormContext<
  Value extends GenericObject,
  Step extends string,
> = Omit<Required<FormProps<Value, Step>>, 'card_id' | 'dirty' | 'save'> &
  Pick<FormProps<Value, Step>, 'card_id'> & {
    isValid: { [key in Step]: boolean }
    dirtyFields: (keyof Value)[]
    originals: Value
    step: ReactState<Step>
    useField: <Field extends keyof Value>(
      field: Field,
    ) => ReactState<Value[Field]>
  }
