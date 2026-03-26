import React, { useState } from 'react'

import Modal from '../Modal'

import type { ZoomProps } from './interfaces'
import * as S from './styles'

const Zoom = (props: ZoomProps) => {
  const { src, width, height, ...imgProps } = props
  const [modalOpened, setModalOpened] = useState<boolean>(false)

  return (
    <React.Fragment>
      <S.Container
        {...imgProps}
        onClick={() => setModalOpened(true)}
        $width={width}
        $height={height}
      >
        <S.Image src={src} alt='zoom' />

        <S.Dimmer>
          <S.Button
            content='Zoom'
            color='white'
            onClick={() => setModalOpened(true)}
          />
        </S.Dimmer>
      </S.Container>

      <Modal
        openState={[modalOpened, setModalOpened]}
        size='large'
        title='Zoom'
        closeOnClickOutside
      >
        <S.ModalContent>
          <img src={src} alt='zoom' />
        </S.ModalContent>
      </Modal>
    </React.Fragment>
  )
}

export default Zoom
