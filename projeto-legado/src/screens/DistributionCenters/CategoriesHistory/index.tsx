import React from 'react'

import { Button, Modal } from 'semantic-ui-react'

import * as MainStyles from '../styled'

import Manager from './Manager'
import * as S from './styled'

interface CategoriesManagerProps {
  distribution_center_id: number
  title?: JSX.Element | string
  closeModal: () => void
}

const CategoriesManager = (props: CategoriesManagerProps) => {
  const { distribution_center_id, closeModal, title } = { ...props }

  return (
    <Modal size='large' open>
      <MainStyles.ModalHeader
        content='Regras do Rateio (Histórico)'
        color='blue'
      />

      <MainStyles.Content>
        {title && <S.Title>{title}</S.Title>}
        <Manager
          distribution_center_id={distribution_center_id}
          title={title}
        />
      </MainStyles.Content>

      <Modal.Actions>
        <Button
          type='button'
          content='OK'
          color='blue'
          onClick={closeModal}
          style={{ marginRight: 0 }}
        />
      </Modal.Actions>
    </Modal>
  )
}

export default CategoriesManager
