import React from 'react'

import Modal from '../../component'

import type { AuditProps } from './interfaces'
import * as S from './styles'

const Audit = (props: AuditProps) => {
  const {
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
      title='Auditoria'
      closeOnClickOutside={closeOnClickOutside}
      closeOnEsc={closeOnEsc}
      openState={openState}
      size='custom'
      customSize={{ width: '500px' }}
      color='greyishBlue'
      inverted
      footer={[
        {
          appearance: 'borderless',
          content: 'Cancelar',
          onClick: cancelAction,
        },
        {
          content: 'Enviar',
          onClick: confirmAction,
        },
      ]}
    >
      <S.Content>{children || content}</S.Content>
    </Modal>
  )
}

export default Audit
