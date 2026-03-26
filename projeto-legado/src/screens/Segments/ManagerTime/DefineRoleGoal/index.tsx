import React from 'react'

import { Button, Modal } from 'semantic-ui-react'

import * as MainStyles from '../../styled'

import Manager from './Manager'
import * as S from './styled'

interface DefineRoleGoalProps {
  item: {
    id: number
    name: string | null
    store_count: number
  }
  title?: JSX.Element | string
  closeModal: () => void
}

const DefineRoleGoal = (props: DefineRoleGoalProps) => {
  const { item, closeModal, title } = { ...props }

  return (
    <S.Modal size='large' open className='default-large-modal'>
      <S.ModalHeader content='Definir Meta por Função' />

      <MainStyles.Content>
        {title && <S.Title>{title}</S.Title>}

        <Manager
          segment={{
            id: item.id,
            name: item.name,
            store_count: item.store_count,
          }}
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
    </S.Modal>
  )
}

export default DefineRoleGoal
