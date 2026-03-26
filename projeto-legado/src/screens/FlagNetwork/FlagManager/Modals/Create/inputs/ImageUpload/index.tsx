import { MwIcon } from '@mw-kit/mw-ui'

import useCreateContext from '../../context'

import * as S from './styles'

const ImageUpload = () => {
  const {
    form,
    file: [file, setFile],
    fileUploaded: [, setFileUploaded],
  } = useCreateContext()

  const uploadAvatar = (file: any) => {
    if (!file) return

    const reader = new FileReader()

    reader.onload = (e) => {
      let img = document.createElement('img')

      img.onload = () => {
        let MAX_WIDTH = 133
        let MAX_HEIGHT = 100

        let width = img.width
        let height = img.height

        if (width > height) {
          if (height > MAX_HEIGHT) {
            width = width * (MAX_HEIGHT / height)
            height = MAX_HEIGHT
          }
        } else {
          if (width > MAX_WIDTH) {
            height = height * (MAX_WIDTH / width)
            width = MAX_WIDTH
          }
        }

        let canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height

        let ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)

        let dataurl = canvas.toDataURL(file.type)
        setFileUploaded(false)
        setFile(dataurl)
      }

      img.src = e.target.result.toString()
    }

    reader.readAsDataURL(file)
  }

  return (
    <S.ImageUploadContainer
      $disabled={!form.watch('grandparent_id') || !form.watch('parent_id')}
    >
      <p>Imagem da Bandeira</p>

      <S.Content>
        {!file ? (
          <S.Subcontent>
            <p>Tamanho Mínimo</p>
            <p>133x100 px</p>
          </S.Subcontent>
        ) : (
          <S.Image $image={file}>
            <div>
              <MwIcon
                type='feather'
                icon='trash_2'
                width='17px'
                height='17px'
                strokeWidth='3px'
                onClick={() => {
                  setFile('')
                  setFileUploaded(false)
                }}
              />
            </div>
          </S.Image>
        )}
      </S.Content>

      <S.LabelSubmit
        isDisabled={!form.watch('grandparent_id') || !form.watch('parent_id')}
      >
        <span>Escolher Arquivo</span>
        <input
          type='file'
          formEncType='multipart/form-data'
          accept='image/*'
          disabled={!form.watch('grandparent_id') || !form.watch('parent_id')}
          onChange={(e) => {
            uploadAvatar(e.target.files[0])
          }}
        />
      </S.LabelSubmit>
    </S.ImageUploadContainer>
  )
}

export default ImageUpload
