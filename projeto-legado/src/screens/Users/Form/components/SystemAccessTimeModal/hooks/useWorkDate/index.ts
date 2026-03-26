import { useCallback, useEffect, useState } from 'react'

import { ValidationError } from 'yup'

import { WorkDate, WorkDateForm } from '../../interfaces'
import { workDateSchema } from '../../schema'

const defaultWorkDate: [Readonly<WorkDate>, Readonly<WorkDate>] = [
  {
    days: [],
    type: 'J',
    start_time: '',
    end_time: '',
  },
  {
    type: 'J',
    start_date: '',
    end_date: '',
    start_time: '',
    end_time: '',
  },
]

const defaultWorkDateForm: Readonly<WorkDateForm> = {
  submits: 0,
  errors: {},
  validating: false,
}

const useWorkDate = () => {
  const [workDate, setWorkDate] = useState<WorkDate>({ ...defaultWorkDate[0] })
  const [workDateForm, setWorkDateForm] = useState<WorkDateForm>({
    ...defaultWorkDateForm,
  })

  useEffect(() => {
    setWorkDateForm((prev) => ({ ...prev, validating: true }))

    const timeoutId = setTimeout(async () => {
      let errors: WorkDateForm['errors'] = {}

      try {
        await workDateSchema.validate(workDate, {
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

      setWorkDateForm((prev) => ({ ...prev, errors, validating: false }))
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [workDateSchema, workDate])

  const reset = (index: number) => {
    setWorkDate({ ...defaultWorkDate[index] })
    setWorkDateForm({ ...defaultWorkDateForm })
  }

  const isInvalid = useCallback(
    (field: keyof WorkDateForm['errors']) => {
      return workDateForm.submits && field in workDateForm.errors
    },
    [workDateForm],
  )

  return {
    workDate: [workDate, setWorkDate],
    workDateForm: [workDateForm, setWorkDateForm],
    reset,
    isInvalid,
  } as const
}

export default useWorkDate
