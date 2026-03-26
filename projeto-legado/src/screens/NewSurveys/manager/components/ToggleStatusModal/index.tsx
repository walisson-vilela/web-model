import { useState } from 'react'

import { MwButton } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'
import { Modal as SemanticModal } from 'semantic-ui-react'

import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../components/Toaster'

import { ToggleModalStatusI } from './interface'
import { toggleStatus } from './services'
import * as S from './styles'

export const ToggleStatusModal = ({
  content,
  reload,
  setNotificationModal,
  status,
  toUpdated,
}: ToggleModalStatusI) => {
  const [loading, setLoading] = useState(false)

  const toggle = async () => {
    setLoading(true)
    try {
      await toggleStatus(status, toUpdated)
      toast(<ToasterContent color='normal' />, SuccessStyle)
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      reload()
      setLoading(false)
      setNotificationModal(<></>)
    }
  }

  return (
    <SemanticModal open size='tiny'>
      {content}
      <SemanticModal.Actions>
        <S.Footer>
          <MwButton
            appearance='borderless'
            content='Cancelar'
            onClick={() => setNotificationModal(<></>)}
          />
          <MwButton
            content={
              status === 'A'
                ? 'Ativar'
                : status === 'I'
                ? 'Inativar'
                : 'Deletar'
            }
            color={status === 'A' ? 'blue' : 'red'}
            loading={loading}
            onClick={toggle}
          />
        </S.Footer>
      </SemanticModal.Actions>
    </SemanticModal>
  )
}
