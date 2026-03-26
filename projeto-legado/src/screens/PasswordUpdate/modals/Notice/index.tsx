import { Button } from 'semantic-ui-react'

import Modal from '../../../../components/MwModal'
import { getToken } from '../../../../utils'

import * as S from './styles'

interface NoticeProps {
  close: () => void
}

const Notice = ({ close }: NoticeProps) => {
  const {
    payload: { tmp_password },
  } = getToken()

  return (
    <Modal
      modal={{
        title: 'Alteração de Senha',
        titleColor: 'white',
        size: 'tiny',
        content: (
          <S.Content>
            {tmp_password
              ? 'Por ser o seu primeiro acesso ou estar utilizando uma senha provisória, será necessário realizar a troca de senha.'
              : 'Sua senha expirou, por questões de segurança é necessário que efetue a alteração.'}
          </S.Content>
        ),
        actions: [
          <S.Footer>
            <Button type='button' color='blue' content='OK' onClick={close} />
          </S.Footer>,
        ],
      }}
    />
  )
}

export default Notice
