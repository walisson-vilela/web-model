import { MwIcon } from '@mw-kit/mw-ui'

import { Form } from '../../../../interfaces'

import * as S from './styled'

interface IImageOverlay {
  file: Form['files'][number] | null | undefined
  onRemove?: () => void
  height?: string
}

const ImageOverlay = (props: IImageOverlay) => {
  const { file, onRemove, height } = props

  return (
    <S.Image
      $height={height}
      {...(file
        ? {
            $image: file instanceof File ? URL.createObjectURL(file) : file.url,
            children: (
              <S.Content>
                <MwIcon
                  type='feather'
                  icon='trash_2'
                  width='17px'
                  height='17px'
                  strokeWidth='3px'
                  onClick={onRemove}
                />
              </S.Content>
            ),
          }
        : {
            children: (
              <S.Subcontent>
                <p>Imagem</p>
              </S.Subcontent>
            ),
          })}
    ></S.Image>
  )
}

export default ImageOverlay
