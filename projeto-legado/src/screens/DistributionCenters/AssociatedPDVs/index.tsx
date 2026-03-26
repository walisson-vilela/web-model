import React from 'react'

import { Button, Modal } from 'semantic-ui-react'

import * as MainStyles from '..//styled'

import Manager from './Manager'
import { Item } from './interfaces'
import * as S from './styled'

interface AssociatedPDVsProps {
  item: Item
  title?: string | JSX.Element
  closeModal: () => void
  historic?: boolean
}

const AssociatedPDVs = (props: AssociatedPDVsProps) => {
  const { item, title, closeModal, historic } = { ...props }

  const sufix = historic ? ' (Histórico)' : ''

  return (
    <S.Modal size='large' open>
      <S.ModalHeader content={`PDVs associados${sufix}`} />

      <MainStyles.Content>
        <Manager title={title} item={item} historic={historic} />
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
    </S.Modal>
  )
}

export default AssociatedPDVs
