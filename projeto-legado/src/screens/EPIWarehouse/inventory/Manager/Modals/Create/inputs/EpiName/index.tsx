import { MwInput } from '@mw-kit/mw-ui'
import { useEffect, useRef } from 'react'
import { Controller } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { fetchEPICheckName } from '../../../../../../../../redux/actions/EPIWarehouseActions'
import useCreateContext from '../../context'
import { ErrorMessage } from './styles'

const EpiName = () => {
  const { form, nameCheck } = useCreateContext()
  const dispatch = useDispatch()
  const debounceRef = useRef<any>(null)

  const nameValue = form.watch('name')

  useEffect(() => {
    // limpa qualquer timer antigo
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    // só dispara se tiver 3 ou mais caracteres
    if (nameValue && nameValue.trim().length >= 3) {
      debounceRef.current = setTimeout(async () => {
        try {
          const response = await dispatch(fetchEPICheckName({ name: nameValue }))
          console.log('Resposta do checkName:', response)
          await nameCheck.trigger()
        } catch (err) {
          console.error('Erro ao validar nome:', err)
        }
      }, 500) // espera 500ms após parar de digitar
    } else {
      // limpa o campo e reseta validação se for menor que 3 caracteres
      form.setValue('name', nameValue || '', {
        shouldDirty: true,
        shouldValidate: false,
      })
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
            type="text"
            label="Nome do EPI"
            placeholder="Digite aqui"
            loading={nameCheck.loading}
            invalid={nameCheck.isValid === false}
            required
          />
        )}
      />

      <ErrorMessage>{nameCheck.message}</ErrorMessage>
    </>
  )
}

export default EpiName
