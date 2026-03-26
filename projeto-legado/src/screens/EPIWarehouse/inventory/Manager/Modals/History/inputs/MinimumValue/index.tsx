import { MwInput } from '@mw-kit/mw-ui'
import { useEffect, useRef } from 'react'
import { Controller } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import useCreateContext from '../../context'

const MinimumValue = () => {
  const { form } = useCreateContext()
  const dispatch = useDispatch()
  const debounceRef = useRef<any>(null)

  const nameValue = form.watch('name')

  useEffect(() => {
    // limpa qualquer timer antigo
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [nameValue, dispatch])

  return (
    <>
      <Controller
        name="name"
        control={form.control}
        render={({ field: props }) => (
          <MwInput
            {...props}
            type="number"
            style={{ width: '10rem'}}
            label="Quantidade em estoque mínimo"
            placeholder="Digite aqui"
            required
          />
        )}
      />
    </>
  )
}

export default MinimumValue
