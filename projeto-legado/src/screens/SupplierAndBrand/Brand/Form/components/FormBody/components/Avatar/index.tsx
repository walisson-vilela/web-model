import React, { useState } from 'react'

import { Dropdown } from '@mw-kit/mw-manager'
import { MwGrid } from '@mw-kit/mw-ui'
import { FiCamera } from 'react-icons/fi'

import ImageCrop from '../../../../../../../../components/ImageCrop'
import useContext from '../../../../context'

import ConfirmDelete from './ConfirmDelete'
import ImageView from './ImageView'
import * as S from './styled'

const Avatar = () => {
  const {
    form: { watch, setValue, setValueOptions },
    modal: [, setModal],
  } = useContext()

  const file = watch('file')

  const setAvatar = (value: string) => {
    setValue('file', value, setValueOptions)
  }

  const [inputRef, setInputRef] = useState<HTMLInputElement>(null)

  const onClickSee = () => {
    setModal(<ImageView close={setModal} image={file} />)
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
    <MwGrid
      rows={{
        borderless: true,
        verticalAlign: 'center',
      }}
      cols={{
        spacing: {
          top: 's1',
          left: 's3',
          bottom: 's1',
          right: 's3',
        },
      }}
      spacing={{
        top: 's4',
        left: 's3',
        bottom: 's4',
        right: 's3',
      }}
      borderless
    >
      <MwGrid.Row>
        <MwGrid.Col width='auto'>
          <S.ImageContainer disabled={!file}>
            <Dropdown
              loading={!file}
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
              <S.RoundedImage src={file}>
                <FiCamera size={16} color='#B2B2B2' />
              </S.RoundedImage>
            </Dropdown>
          </S.ImageContainer>
        </MwGrid.Col>

        <MwGrid.Col>
          <div>Tamanho Permitido (80x80)</div>
        </MwGrid.Col>

        <MwGrid.Col width='auto'>
          <S.FileInput>
            <span>Escolher Arquivo</span>

            <input
              type='file'
              name='file'
              accept='image/*'
              ref={setInputRef}
              onChange={onChangeFile}
              onClick={onClickFile}
            />
          </S.FileInput>
        </MwGrid.Col>
      </MwGrid.Row>
    </MwGrid>
  )
}

export default Avatar
