import { useCallback, useState } from 'react'

import { toast } from 'react-hot-toast'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/opacity.css'

import rocket from '../../../../../../../../../../assets/img/rocket-blue.png'
import {
  ErrorStyle,
  ToasterContent,
} from '../../../../../../../../../../components/Toaster'
import { getImage } from '../../../../../../../service'
import { AnswerProps } from '../../interface'

import * as S from './styles'

const ImageCache = ({ answer }: { answer: AnswerProps }) => {
  const { id, hash = '' } = answer

  const [thumbnail, setThumbnail] = useState<string>()

  const handleGetImage = useCallback(async () => {
    try {
      const base64 = await getImage(id, hash, 64)
      setThumbnail(base64)
    } catch (error) {
      setThumbnail(rocket)
      console.error(error)
      toast(<ToasterContent color='error' />, ErrorStyle)
    }
  }, [])

  return (
    <S.Answer>
      <LazyLoadImage
        src={thumbnail}
        effect='opacity'
        delayTime={100}
        beforeLoad={thumbnail ? undefined : handleGetImage}
        visibleByDefault={true}
      />

      <S.Approvation>
        <span>{answer.status === 0 ? 'Reprovado' : 'Aprovado'}</span>
      </S.Approvation>
    </S.Answer>
  )
}

export default ImageCache
