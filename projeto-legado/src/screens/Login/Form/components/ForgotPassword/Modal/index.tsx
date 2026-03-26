import { useCallback, useEffect, useState } from 'react'

import { MwButton, MwLoader } from '@mw-kit/mw-ui'

import Modal from '../../../../../../components/MwModal'
import { numberOrDefault } from '../../../../../../utils/Formatters'

import ContentModal from './components/ContentModal'
import { IForgotPassword, IRecoverPassword } from './interfaces'
import { recoverPassword } from './service'

const ForgotPasswordModal = (props: IForgotPassword) => {
  const { onClose, account, username: user_name } = props

  const [forgotInfo, setForgotInfo] = useState<IRecoverPassword | null>(null)

  const onLoadData = useCallback(async () => {
    try {
      const data = await recoverPassword(numberOrDefault(account), user_name)

      setForgotInfo(data)
    } catch (error) {
      console.error(error)
      onClose()
    }
  }, [account, user_name])

  useEffect(() => {
    onLoadData()
  }, [onLoadData])

  return (
    <Modal.Modal open style={{ maxWidth: '499px' }} size='small'>
      <Modal.Header color='white'>Atenção!</Modal.Header>

      <Modal.Body $height='97px'>
        {forgotInfo ? <ContentModal forgotInfo={forgotInfo} /> : <MwLoader />}
      </Modal.Body>

      <Modal.Footer>
        <MwButton
          content='Ok'
          disabled={!forgotInfo}
          type='button'
          color='red'
          onClick={onClose}
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default ForgotPasswordModal
