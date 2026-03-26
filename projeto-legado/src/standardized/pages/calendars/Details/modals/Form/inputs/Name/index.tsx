import { useCallback, useState } from 'react'

import { MwInput } from '@mw-kit/mw-ui'
import { debounce } from 'lodash'

import { useMainContext } from '../../../../contexts'
import tabs from '../../../../tabs'
import useFormContext from '../../context'

import { checkName } from './services'
import { ErrorMessage } from './style'

const Name = () => {
  const {
    useField,
    card_id,
    errors: [errors, setErrors],
  } = useFormContext()
  const {
    tab: [tab],
  } = useMainContext()
  const [name, setName] = useField('name')
  const [loading, setLoading] = useState(false)
  const [invalid, setInvalid] = useState(false)

  const setErrorFunc = (code: string, message: string) => {
    setErrors((prev) => {
      if (prev.name && prev.name.code === code) return prev
      return {
        ...prev,
        name: {
          code: code,
          message: message,
        },
      }
    })
  }

  const checkNameFunc = useCallback(
    debounce(async (name: string) => {
      setLoading(true)
      setInvalid(false)

      try {
        const response = await checkName(name, tabs[tab].types.join(), card_id)

        if (!response) {
          setErrorFunc(
            'ALREADY_USED',
            'Não é possível utilizar nomes repetidos',
          )
        } else {
          setErrors((prev) => {
            if (!prev.name) return prev
            const { name, ...errors } = prev
            return errors
          })
        }
      } catch (e) {
        setErrorFunc('REQUEST_ERROR', '')
        setInvalid(true)
      } finally {
        setLoading(false)
      }
    }, 1000),
    [],
  )

  return (
    <div>
      <MwInput
        type='text'
        label='Nome'
        placeholder='Nome do Evento'
        setValue={(e) => {
          setName(e)
          checkNameFunc(e)
          setErrorFunc('UNCHECKED', '')
        }}
        value={name}
        disabled={loading}
        loading={loading}
        invalid={invalid}
        width='288px'
        required
      />
      <ErrorMessage>{errors?.name?.message}</ErrorMessage>
    </div>
  )
}

export default Name
