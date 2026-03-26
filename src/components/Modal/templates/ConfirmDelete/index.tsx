import React from 'react'

import Modal from '../../component'

import type { ConfirmDeleteProps } from './interfaces'
import * as S from './styles'

const ConfirmDelete = (props: ConfirmDeleteProps) => {
  const {
    cancelAction,
    confirmAction,
    openState,
    content,
    children,
    title,
    closeOnClickOutside,
    closeOnEsc,
  } = props

  return (
    <Modal
      title={'Deletar ' + title}
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
          color: 'pink',
          content: 'Deletar',
          onClick: confirmAction,
        },
      ]}
    >
      <S.Content>{children || content}</S.Content>
    </Modal>
  )
}

export default ConfirmDelete
