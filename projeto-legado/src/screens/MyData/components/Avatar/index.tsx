import React, { useEffect, useState } from 'react'

import { Dropdown } from '@mw-kit/mw-manager'
import { FiCamera } from 'react-icons/fi'

import ImageCrop from '../../../../components/ImageCrop'
import MwModal, { ModalState } from '../../../../components/MwModal'
import useContext from '../../context'
import * as S from '../../styled'

import ConfirmDelete from './ConfirmDelete'
import ImageView from './ImageView'
import { Container, FileInput, ImageContainer, RoundedImage } from './styled'

const Avatar = () => {
  const [modal, setModal] = useState<ModalState>(null)
  const {
    form: { watch, setValue, setValueOptions },
    data,
  } = useContext()

  const avatar = watch('avatar')

  const setAvatar = (value: string) => {
    setValue('avatar', value, setValueOptions)
  }

  const [inputRef, setInputRef] = useState<HTMLInputElement>(null)

  useEffect(() => {
    if (data.avatar) {
      setValue('avatar', String(data.avatar.avatar))
    }
  }, [data])

  const onClickSee = () => {
    setModal(<ImageView close={setModal} image={avatar} />)
  }

  const onClickLoad = () => {
    if (!inputRef) {
      console.error("Couldn't find file input element")
      return
    }

    inputRef.click()
  }

  const onClickDelete = () => {
    setModal(<ConfirmDelete close={setModal} setSource={setAvatar} />)
  }

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { files } = e.target
    if (files.length < 1) return

    setModal(
      <ImageCrop close={setModal} image={files[0]} saveAvatar={setAvatar} />,
    )
  }

  const onClickFile = (e: React.MouseEvent<HTMLInputElement>): void => {
    e.currentTarget.value = null
  }

  return (
    <S.SubSectionAvatar>
      <Container>
        <ImageContainer>
          <Dropdown
            loading={!avatar}
            axis='y'
            items={[
              {
                content: 'Ver Imagem',
                onClick: onClickSee,
                rules: [],
              },
              {
                content: 'Carregar',
                onClick: onClickLoad,
                rules: [],
              },
              {
                content: 'Deletar',
                onClick: onClickDelete,
                rules: [],
              },
            ]}
          >
            <RoundedImage src={avatar}>
              <FiCamera size={16} color='#B2B2B2' />
            </RoundedImage>
          </Dropdown>
        </ImageContainer>

        <div>Tamanho Permitido (80x80)</div>

        <FileInput>
          <span>Escolher Arquivo</span>

          <input
            type='file'
            name='avatar'
            accept='image/*'
            ref={setInputRef}
            onChange={onChangeFile}
            onClick={onClickFile}
          />
        </FileInput>
      </Container>
      <MwModal modal={modal} />
    </S.SubSectionAvatar>
  )
}

export default Avatar
