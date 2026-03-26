import React, { useCallback, useState } from 'react'

import { Dropdown } from '@mw-kit/mw-manager'
import { SetValueConfig, UseFormReturn } from 'react-hook-form'
import { FiCamera } from 'react-icons/fi'

import ImageCrop from '../../../../../components/ImageCrop'
import { ModalState } from '../../../../../components/MwModal'

import ConfirmDelete from './ConfirmDelete'
import ImageView from './ImageView'
import * as S from './styled'

const Avatar = (props: {
  form: UseFormReturn<{ avatar: string | null }> & {
    setValueOptions: SetValueConfig
  }
  setModal: React.Dispatch<React.SetStateAction<ModalState | null>>
  viewMode?: boolean
}) => {
  const {
    form: { watch, setValue, setValueOptions },
    setModal,
    viewMode,
  } = props

  const avatar = watch('avatar')

  const setAvatar = (value: string | null) => {
    setValue('avatar', value, setValueOptions)
  }

  const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null)

  const onClickSee = useCallback(() => {
    avatar &&
      setModal(<ImageView close={() => setModal(null)} image={avatar} />)
  }, [avatar])

  const onClickLoad = () => {
    if (!inputRef) {
      console.error("Couldn't find file input element")
      return
    }

    inputRef.click()
  }

  const onClickDelete = () => {
    setModal(
      <ConfirmDelete
        close={() => setModal(null)}
        setSource={() => setAvatar(null)}
      />,
    )
  }

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { files } = e.target
    if (!files) return

    setModal(
      <ImageCrop
        close={() => setModal(null)}
        image={files[0]}
        saveAvatar={setAvatar}
      />,
    )
  }

  const onClickFile = (e: React.MouseEvent<HTMLInputElement>): void => {
    e.currentTarget.value = ''
  }

  return (
    <S.SubSection>
      <S.Container>
        <S.ImageContainer>
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
            <S.RoundedImage $src={avatar}>
              <FiCamera size={16} color='#B2B2B2' />
            </S.RoundedImage>
          </Dropdown>
        </S.ImageContainer>

        {!viewMode && (
          <React.Fragment>
            <div>Tamanho Permitido (80x80)</div>

            <S.FileInput>
              <span>Escolher Arquivo</span>

              <input
                type='file'
                name='avatar'
                accept='image/*'
                ref={setInputRef}
                onChange={onChangeFile}
                onClick={onClickFile}
              />
            </S.FileInput>
          </React.Fragment>
        )}
      </S.Container>
    </S.SubSection>
  )
}

export default Avatar
