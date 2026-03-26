import { useContext } from 'react'

import { FiImage } from 'react-icons/fi'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Loader, Modal, Placeholder } from 'semantic-ui-react'

import { GalleryViewContext } from '../../../../context'
import ZoomModal from '../../../Modals/ZoomModal'
import { CardContext } from '../../context'

import { CardFooter } from './components/cardFooter'
import './style.css'
import * as S from './styles'

export const CardFront = () => {
  const { rotate, cardProps, loadingImage, handleGetImage, thumbnail } =
    useContext(CardContext)
  const { columnsPerRow, setOpenZoomModal } = useContext(GalleryViewContext)
  const { card, accordionId } = cardProps
  const openModalZoom = () => {
    setOpenZoomModal(
      <Modal
        open
        size='large'
        style={{ overflow: 'hidden' }}
        children={<ZoomModal card={card} accordionId={accordionId} />}
      />,
    )
  }

  const cardIsHidden = card.tags.find((item) => item.name === 'hidden')
  const isHidden = cardIsHidden && cardIsHidden.value === 0 ? false : true

  return (
    <S.Container
      rotateImg={rotate}
      direction={columnsPerRow === 3 ? 'column' : 'row'}
    >
      <S.ImageWrapper
        isLoading={loadingImage}
        flex={columnsPerRow === 3 ? 'row' : 'column'}
        isBlocked={isHidden}
      >
        {loadingImage ? (
          <S.Loader>
            <Loader active />
          </S.Loader>
        ) : (
          <>
            <LazyLoadImage
              src={thumbnail}
              effect='opacity'
              delayTime={100}
              placeholder={<Placeholder />}
              beforeLoad={thumbnail ? undefined : handleGetImage}
              wrapperClassName='image-wrapper'
            />

            {isHidden ? (
              <S.Overlay isBlocked={isHidden} className='overlay'>
                <span>
                  <FiImage color='#FFFFFF' size={64} />
                  Imagem Bloqueada
                </span>
              </S.Overlay>
            ) : (
              <S.Overlay
                isBlocked={isHidden}
                className='overlay'
                onClick={openModalZoom}
              >
                <span>Zoom</span>
              </S.Overlay>
            )}
          </>
        )}
      </S.ImageWrapper>
      <CardFooter />
    </S.Container>
  )
}
