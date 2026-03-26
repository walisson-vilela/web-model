import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import useFormContext from '../../context'
import { Error, PasswordInputContainer } from '../../styles'

const name = 'password_confirm'
const PasswordConfirm = () => {
  const {
    form: {
      control,
      formState: { errors },
      isInvalid,
    },
  } = useFormContext()

  const invalid = isInvalid(name)

  return (
    <PasswordInputContainer>
      <Controller
        name={name}
        control={control}
        render={({ field: props }) => {
          return (
            <MwInput
              {...props}
              type='password'
              label='Repita a Senha'
              invalid={invalid}
            />
          )
        }}
      />

      <Error
        $lines={2}
        children={
          errors[name] && errors[name].type === 'oneOf'
            ? errors[name].message
            : undefined
        }
      />
    </PasswordInputContainer>
  )
}

export default PasswordConfirm
