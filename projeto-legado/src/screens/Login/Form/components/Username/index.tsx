import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import { useLoginContext } from '../../../context'
import { usernameMask } from '../../../schemas'

const Username = () => {
  const {
    method,
    loading: [loading],
    loginType: [loginType],
    isSupport,
  } = useLoginContext()

  return (
    <Controller
      name='username'
      control={method.control}
      render={({ field: props }) => (
        <MwInput
          {...props}
          type='text'
          label={<b>Usuário</b>}
          placeholder='Digite seu usuário'
          mask={
            !isSupport && loginType && loginType.login_by in usernameMask
              ? usernameMask[loginType.login_by]
              : undefined
          }
          invalid={props.name in method.formState.errors}
          disabled={loading.loginType}
        />
      )}
    />
  )
}

export default Username
