import { Button } from 'semantic-ui-react'

import Modal from '../../../../../../components/MwModal'

import * as S from './styles'

interface ConfirmDeleteProps {
  close: () => void
  setSource: () => void
}

const ConfirmDelete = ({ close, setSource }: ConfirmDeleteProps) => (
  <Modal
    modal={{
      title: 'Deletar',
      size: 'tiny',
      content: 'Você deseja realmente deletar a imagem?',
      actions: [
        <S.Footer key={0}>
          <Button
            basic
            type='button'
            className='tertiary'
            content='Cancelar'
            onClick={close}
          />

          <Button
            type='button'
            color='red'
            content='Deletar'
            onClick={() => {
              setSource()
              close()
            }}
          />
        </S.Footer>,
      ],
    }}
  />
)

export default ConfirmDelete
