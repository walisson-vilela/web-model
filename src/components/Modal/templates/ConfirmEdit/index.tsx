import React from 'react'

import Modal from '../../component'

import type { ConfirmSuccessProps } from './interfaces'
import * as S from './styles'

const ConfirmSuccess = (props: ConfirmSuccessProps) => {
  const {
    homeAction,
    cancelAction,
    confirmAction,
    openState,
    content,
    children,
    closeOnClickOutside,
    closeOnEsc,
  } = props

  return (
    <Modal
      title='Confirmação!'
      closeOnClickOutside={closeOnClickOutside}
      closeOnEsc={closeOnEsc}
      openState={openState}
      size='custom'
      customSize={{ width: '630px' }}
      color='greyishBlue'
      inverted
      footer={[
        {
          appearance: 'bordered',
          content: 'Ir para Home',
          onClick: homeAction,
        },
        {
          appearance: 'bordered',
          content: 'Continuar edição',
          onClick: cancelAction,
        },
        {
          content: 'Novo Cadastro',
          onClick: confirmAction,
        },
      ]}
    >
      <S.Content>{children || content}</S.Content>
    </Modal>
  )
}

export default ConfirmSuccess
