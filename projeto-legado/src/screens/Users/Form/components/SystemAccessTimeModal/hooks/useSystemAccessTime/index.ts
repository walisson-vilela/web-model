import { useCallback, useEffect, useState } from 'react'

import { ValidationError } from 'yup'

import { SystemAccessTime, SystemAccessTimeForm } from '../../interfaces'
import { systemAccessTimeSchema } from '../../schema'

const defaultSystemAccessTimeForm: Readonly<SystemAccessTimeForm> = {
  submits: 0,
  errors: {},
  validating: false,
}

const useSystemAccessTime = (props: {
  system_access_time: SystemAccessTime
}) => {
  const [systemAccessTime, setSystemAccessTime] = useState<SystemAccessTime>({
    ...props.system_access_time,
  })
  const [systemAccessTimeForm, setSystemAccessTimeForm] =
    useState<SystemAccessTimeForm>({ ...defaultSystemAccessTimeForm })

  useEffect(() => {
    setSystemAccessTimeForm((prev) => ({ ...prev, validating: true }))

    const timeoutId = setTimeout(async () => {
      let errors: SystemAccessTimeForm['errors'] = {}

      try {
        await systemAccessTimeSchema.validate(systemAccessTime, {
          abortEarly: false,
        })
      } catch (e) {
        if (e instanceof ValidationError) {
          errors = e.inner.reduce((prev, error) => {
            if (!error.path) return prev
            return { ...prev, [error.path]: error }
          }, {})

          console.error({
            errors,
            validation: { ...e },
          })
        }
      }

      setSystemAccessTimeForm((prev) => ({
        ...prev,
        errors,
        validating: false,
      }))
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [systemAccessTimeSchema, systemAccessTime])

  const reset = () => {
    setSystemAccessTime({ ...props.system_access_time })
    setSystemAccessTimeForm({ ...defaultSystemAccessTimeForm })
  }

  const isInvalid = useCallback(
    (field: keyof SystemAccessTimeForm['errors']) => {
      return (
        systemAccessTimeForm.submits && field in systemAccessTimeForm.errors
      )
    },
    [systemAccessTimeForm],
  )

  return {
    systemAccessTime: [systemAccessTime, setSystemAccessTime],
    systemAccessTimeForm: [systemAccessTimeForm, setSystemAccessTimeForm],
    reset,
    isInvalid,
  } as const
}

export default useSystemAccessTime
