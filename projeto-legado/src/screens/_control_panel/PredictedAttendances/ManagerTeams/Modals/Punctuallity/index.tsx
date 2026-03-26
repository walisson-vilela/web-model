import React from 'react'

import { Button, Modal } from 'semantic-ui-react'

import Manager from './Manager'
import { AssociatedPDVProps } from './interfaces'
import * as S from './styles'

const Punctuallity = (props: AssociatedPDVProps): JSX.Element => {
  const { onClose, data } = props
  return (
    <S.Modal open size='large'>
      <S.ModalHeader> Pontualidade </S.ModalHeader>
      <S.Main>
        <Manager data={data} />
      </S.Main>
      <Modal.Actions>
        <Button type='button' primary content='Ok' onClick={onClose} />
      </Modal.Actions>
    </S.Modal>
  )
}

export default Punctuallity
