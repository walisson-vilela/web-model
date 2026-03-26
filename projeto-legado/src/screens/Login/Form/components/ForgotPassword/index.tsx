import { MwButton } from '@mw-kit/mw-ui'

import Popup from '../../../../../standardized/components/Popup'
import { useLoginContext } from '../../../context'

import ForgotPasswordModal from './Modal'

const ForgotPassword = () => {
  const {
    method,
    modal: [, setModal],
  } = useLoginContext()

  const [account, username] = method.watch(['account', 'username'])

  const invalid =
    'account' in method.formState.errors ||
    !account ||
    'username' in method.formState.errors ||
    !username

  const forgotPassword = () => {
    setModal(
      <ForgotPasswordModal
        account={account}
        username={username}
        onClose={() => setModal(null)}
      />,
    )
  }

  return (
    <Popup
      on='click'
      position='left center'
      inverted
      content={
        <div style={{ width: '307px' }}>
          Não é possível solicitar uma nova senha provisória sem definir Conta e
          Usuário.
        </div>
      }
      trigger={
        <div>
          <MwButton
            color='blue'
            content='Esqueceu sua senha?'
            appearance='link'
            type='button'
            onClick={forgotPassword}
            disabled={invalid}
          />
        </div>
      }
      disabled={!invalid}
    />
  )
}

export default ForgotPassword
