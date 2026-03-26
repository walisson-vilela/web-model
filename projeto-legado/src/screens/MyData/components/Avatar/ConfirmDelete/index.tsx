import { Button } from 'semantic-ui-react'

import Modal from '../../../../../components/MwModal'

import * as S from './styles'

interface ConfirmDeleteProps {
  close: Function
  setSource: Function
}

const ConfirmDelete = ({ close, setSource }: ConfirmDeleteProps) => (
  <Modal
    modal={{
      title: 'Deletar',
      size: 'tiny',
      content: 'Você deseja realmente deletar a imagem?',
      actions: [
        <S.Footer>
          <Button
            basic
            type='button'
            className='tertiary'
            content='Cancelar'
            onClick={() => close(null)}
          />

          <Button
            type='button'
            color='red'
            content='Deletar'
            onClick={() => {
              setSource(null)
              close(null)
            }}
          />
        </S.Footer>,
      ],
    }}
  />
)

export default ConfirmDelete
