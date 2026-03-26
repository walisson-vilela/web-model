import { Button } from 'semantic-ui-react'

import Modal from '../../../../../components/MwModal'
import { fileToBase64 } from '../../../../../utils/FileFormatter'

import * as S from './styles'

interface ImageViewProps {
  close: Function
  image: File | string
}

const ImageView = ({ close, image }: ImageViewProps) => {
  return (
    <Modal
      modal={{
        title: 'Visualizar Imagem',
        titleColor: 'blue',
        size: 'small',
        content: (
          <S.ImageViewer
            src={typeof image === 'string' ? image : fileToBase64(image)}
          />
        ),
        actions: [
          <S.Footer>
            <Button
              type='button'
              color='blue'
              content='OK'
              onClick={() => close(null)}
            />
          </S.Footer>,
        ],
      }}
    />
  )
}

export default ImageView
