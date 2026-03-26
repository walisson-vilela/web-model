import React from 'react'

import { Button, Modal } from 'semantic-ui-react'

import { useModalContext } from '../context'

import Aside from './components/Aside'
import Main from './components/Main'
import * as S from './styles'

const ManagerGroup = () => {
  const { handleCloseModal } = useModalContext()

  return (
    <Modal open size='large'>
      <S.Header> Gerenciar Grupo </S.Header>
      <S.Main>
        <Aside />
        <Main />
      </S.Main>
      <S.Footer>
        <Button
          type='button'
          className='tertiary'
          content='Cancelar'
          onClick={() => handleCloseModal()}
        />
        <Button type='button' primary content='Salvar' />
      </S.Footer>
    </Modal>
  )
}

export default ManagerGroup
