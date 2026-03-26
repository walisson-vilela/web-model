import { useMemo } from 'react'

import type { UseFormReturn } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import useContext from '../../components/StepForm/context'

import type { Value } from './types'

const useFormContext = () => {
  const context = useContext<Value, 'Step1' | 'Step2' | 'Step3'>()

  const form = useForm<Value>({
    defaultValues: context.value[0],
    mode: 'onChange',
  })

  const formWithSync = useMemo(() => {
    const [value, setValue] = context.value

    const syncedSetValue: UseFormReturn<Value>['setValue'] = (
      name,
      value,
      options,
    ) => {
      form.setValue(name as keyof Value, value as typeof value, options)

      setValue((prev) => ({
        ...prev,
        [name]: value,
      }))
    }

    for (const key of Object.keys(value)) {
      const fieldName = key as keyof Value
      if (form.getValues(fieldName) !== value[fieldName]) {
        form.setValue(fieldName, value[fieldName], { shouldValidate: false })
      }
    }

    if (!value.check_in_required) {
      form.setValue('postal_code', '')
      form.setValue('street_type', '')
      form.setValue('street_address', '')
      form.setValue('complement', '')
      form.setValue('sublocality', '')
      form.setValue('city', '')
      form.setValue('state', '')
      form.setValue('lat', '')
      form.setValue('lng', '')
      form.setValue('radius', 0)

      form.setValue('geolocation_at', null)
      form.setValue('geolocation_by_id', null)
      form.setValue('geolocation_by_name', null)
    }

    return {
      ...form,
      setValue: syncedSetValue,
    } as UseFormReturn<Value>
  }, [context.value, form])

  return {
    ...context,
    form: formWithSync,
  }
}

export default useFormContext
