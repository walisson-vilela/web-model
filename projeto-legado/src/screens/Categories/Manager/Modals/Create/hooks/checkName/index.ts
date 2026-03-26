import { useCallback, useEffect } from 'react'

import { UseFormWatch } from 'react-hook-form'

import { StatusProcess, formType } from '../../interfaces'
import { validateName } from '../../services'

const useCheckName = (props: {
  setStatusProcess: React.Dispatch<React.SetStateAction<StatusProcess>>
  setValidName: React.Dispatch<React.SetStateAction<boolean>>
  watch: UseFormWatch<formType>
}) => {
  const { setStatusProcess, setValidName, watch } = props

  const name = watch('name')
  const category = watch('category')
  const parent_id = watch('parent_id')
  const id = watch('id')

  const checkName = useCallback(async () => {
    setStatusProcess((prev) => ({ ...prev, name: true }))

    try {
      if (name) {
        const { success } = await validateName(
          name,
          parent_id || null,
          id || null,
        )

        setValidName(success)
      }
    } catch (error) {
      console.error(error)
    }

    setStatusProcess((prev) => ({ ...prev, name: false }))
  }, [name, category, parent_id, id])

  useEffect(() => {
    setValidName(null)
    const timeoutID = setTimeout(checkName, 1500)
    return () => clearTimeout(timeoutID)
  }, [checkName])
}

export default useCheckName
