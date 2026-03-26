import { useCallback, useEffect } from 'react'

import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import useFormContext from '../../context'
import { checkPassword } from '../../services'
import { PasswordInputContainer } from '../../styles'

const name = 'password'
const Password = () => {
  const {
    form: { control, watch, isInvalid, trigger },
    passwordRules: [, setPasswordRules],
    passwordFrequency: [, setPasswordFrequency],
  } = useFormContext()

  const password = watch('password')

  const invalid = isInvalid(name)

  const onChangePassword = useCallback(async () => {
    try {
      const { data, frequency } = await checkPassword(password)
      setPasswordRules(data)
      setPasswordFrequency(frequency)
    } catch (e) {
      console.error(e)
    }
  }, [password])

  useEffect(() => {
    const timeoutId = setTimeout(onChangePassword, 500)
    return () => clearTimeout(timeoutId)
  }, [onChangePassword])

  return (
    <PasswordInputContainer>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <MwInput
              {...field}
              type='password'
              label='Senha'
              onChange={(...args) => {
                field.onChange(...args)
                trigger()
              }}
              value={password}
              invalid={invalid}
            />
          )
        }}
      />
    </PasswordInputContainer>
  )
}

export default Password
