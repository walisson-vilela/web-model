import { MwButton } from '@mw-kit/mw-ui'

import { useLoginContext } from '../../../context'

const SubmitButton = () => {
  const {
    method,
    loading: [loading],
  } = useLoginContext()
  return (
    <MwButton
      type='submit'
      content='Entrar'
      size='large'
      disabled={!method.formState.isValid || loading.loginType}
      loading={loading.login}
    />
  )
}

export default SubmitButton
