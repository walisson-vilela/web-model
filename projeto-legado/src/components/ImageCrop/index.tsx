import React, { useState } from 'react'

import AvatarEditor from 'react-avatar-editor'
import { Button } from 'semantic-ui-react'

import Modal from '../MwModal'

import * as S from './styles'

interface ImageCropProps {
  close: Function
  saveAvatar?: (file: string) => any
  image: File | string
}

const ImageCrop = ({ close, image, saveAvatar }: ImageCropProps) => {
  const [scale, setScale] = useState<number>(1.25)
  const [editor, setEditor] = useState<any>('')

  const changeScale = (sub: boolean = false): void => {
    setScale((prevState) => {
      return sub ? prevState - 0.25 : prevState + 0.25
    })
  }

  return (
    <Modal
      modal={{
        title: 'Upload de Imagem',
        titleColor: 'blue',
        size: 'small',
        contentPadding: '0',
        content: (
          <S.Container>
            <AvatarEditor
              ref={(e) => setEditor(e)}
              image={image}
              height={300}
              width={300}
              borderRadius={420}
              scale={scale}
              border={[210, 85]}
            />

            <S.Description>Área de Exibição</S.Description>

            <S.ChangeZoom>
              <S.ZoomButton
                onClick={() => changeScale()}
                disabled={scale >= 10}
              >
                {' '}
                +{' '}
              </S.ZoomButton>

              <S.ZoomButton
                onClick={() => changeScale(true)}
                disabled={scale <= 0.5}
              >
                {' '}
                -{' '}
              </S.ZoomButton>
            </S.ChangeZoom>
          </S.Container>
        ),
        actions: [
          <S.Footer>
            <S.Title>
              <b>Dica: </b>Arraste a imagem para ajustar
            </S.Title>

            <div>
              <Button
                basic
                type='button'
                className='tertiary'
                content='Cancelar'
                onClick={() => close(null)}
              />

              <Button
                type='button'
                color='blue'
                content='Aplicar'
                onClick={() => {
                  saveAvatar(editor.getImage().toDataURL())
                  close(null)
                }}
              />
            </div>
          </S.Footer>,
        ],
      }}
    />
  )
}

export default ImageCrop
