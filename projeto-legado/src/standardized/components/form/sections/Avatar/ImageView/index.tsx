import { Button } from 'semantic-ui-react'

import Modal from '../../../../../../components/MwModal'
import { fileToBase64 } from '../../../../../../utils/FileFormatter'

import * as S from './styles'

interface ImageViewProps {
  close: () => void
  image: File | string
}

const ImageView = ({ close, image }: ImageViewProps) => {
  return (
    <Modal
      modal={{
        title: 'Visualizar Imagem',
        titleColor: 'blue',
        size: 'tiny',
        content: (
          <S.ImageViewer
            src={typeof image === 'string' ? image : fileToBase64(image)}
          />
        ),
        actions: [
          <S.Footer key={0}>
            <Button type='button' color='blue' content='OK' onClick={close} />
          </S.Footer>,
        ],
      }}
    />
  )
}

export default ImageView
