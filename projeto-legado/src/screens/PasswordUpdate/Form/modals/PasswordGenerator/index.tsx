import { useCallback, useEffect, useState } from 'react'

import { MwButton, MwIcon, MwLoader } from '@mw-kit/mw-ui'
import { Popup } from 'semantic-ui-react'

import Modal from '../../../../../components/MwModal'
import { generatePassword } from '../../services'

import * as S from './styled'

interface ComponentProps {
  onSubmit: (password: string) => void
  onClose: () => void
}

const PasswordGenerator = ({
  onSubmit,
  onClose,
}: ComponentProps): JSX.Element => {
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')

  const handleSubmit = useCallback(() => {
    onSubmit(password)
    onClose()
  }, [password])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(password)
  }, [password])

  const handleLoad = async () => {
    setLoading(true)
    try {
      const password = await generatePassword()
      setPassword(password)
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
  }

  useEffect(() => {
    handleLoad()
  }, [])

  return (
    <Modal.Modal size='tiny' open>
      <Modal.Header>Gerador de Senha</Modal.Header>

      <Modal.Body>
        {loading && <MwLoader filled />}

        <S.Main>
          <div>
            <b>Senha:</b> {password || '-'}
          </div>

          <S.IconButton onClick={handleLoad} appearance='bordered'>
            <MwIcon color='blue' icon='refresh_cw' type='feather' />
          </S.IconButton>

          <Popup
            on='click'
            content='Senha copiada!'
            pinned
            position='bottom center'
            trigger={
              <MwButton
                type='button'
                appearance='bordered'
                children='Copiar senha'
                {...(loading
                  ? {
                      disabled: true,
                    }
                  : {
                      onClick: handleCopy,
                    })}
              />
            }
          />
        </S.Main>
      </Modal.Body>

      <Modal.Footer>
        <MwButton
          type='button'
          children='Cancelar'
          onClick={onClose}
          appearance='borderless'
        />

        <MwButton
          type='button'
          children='OK'
          {...(loading
            ? {
                disabled: true,
              }
            : {
                onClick: handleSubmit,
              })}
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default PasswordGenerator
