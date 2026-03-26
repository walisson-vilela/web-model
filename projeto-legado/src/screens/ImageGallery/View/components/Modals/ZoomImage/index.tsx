import React, { useCallback, useContext, useEffect, useState } from 'react'

import { MediaSize } from 'react-easy-crop/types'
import { toast } from 'react-hot-toast'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { Loader } from 'semantic-ui-react'

import {
  ErrorStyle,
  ToasterContent,
} from '../../../../../../components/Toaster'
import { GalleryViewContext } from '../../../context'
import { getImage } from '../../../service'

import * as S from './style'

interface ImgSize {
  width: number
  height: number
}

const ZoomImage = ({ dateImage, imageId, storeName, cardHash }) => {
  const { setOpenImageZoom } = useContext(GalleryViewContext)

  const [fullSize, setFullSize] = useState<boolean>(false)
  const [ultraSize, setUltraSize] = useState<boolean>(false)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [allImg, setAllImage] = useState(dateImage)

  const [selectedImage, setSelectedImage] = useState('')

  const [imgSize, setImgSize] = useState<ImgSize>()
  const [windowSize, setWindowSize] = useState(getWindowSize())

  const [isLastImage, setIslastImage] = useState(false)
  const [isFirstImage, setIsFirstImage] = useState(false)
  const [thumbnail, setThumbnail] = useState('')
  function getWindowSize() {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
  }

  function getImageSize(Media: MediaSize) {
    const size = {
      width: Media.width,
      height: Media.height,
    }

    setImgSize(size)
  }

  const handleNextImage = () => {
    let nextIndexImage = allImg.findIndex(
      (image) => image.url === selectedImage,
    )
    nextIndexImage++
    const nextImage = allImg[nextIndexImage].url
    setSelectedImage(nextImage)
  }

  const handlePreviusImage = () => {
    let nextIndexImage = allImg.findIndex(
      (image) => image.url === selectedImage,
    )
    nextIndexImage--
    const nextImage = allImg[nextIndexImage].url
    setSelectedImage(nextImage)
  }
  //efect para controlar a imagem
  useEffect(() => {
    setZoom(1)

    const indexImage = allImg.findIndex((image) => image.url === selectedImage)
    if (indexImage === 0) {
      setIsFirstImage(true)
    } else {
      setIsFirstImage(false)
    }

    if (indexImage === allImg.length - 1) {
      setIslastImage(true)
    } else {
      setIslastImage(false)
    }
  }, [selectedImage])

  useEffect(() => {
    const storegeAllImg = allImg.find((image) => image.id === imageId)
    setSelectedImage(storegeAllImg.url)

    function handleWindowResize() {
      setWindowSize(getWindowSize())
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])
  //efect controlador do zoom
  useEffect(() => {
    if (imgSize) {
      const zoomWithScreen = imgSize.width * zoom

      if (zoomWithScreen >= windowSize.innerWidth) {
        setUltraSize(true)
      } else {
        setUltraSize(false)
      }
    }

    if (zoom > 1) {
      setFullSize(true)
    } else {
      setFullSize(false)
    }
  }, [zoom])

  const handleGetImage = useCallback(async () => {
    setLoading(true)

    try {
      const base64 = await getImage(imageId, cardHash || '')
      setSelectedImage(base64)
    } catch (error) {
      console.error(error)
      toast(<ToasterContent color='error' />, ErrorStyle)
    }

    setLoading(false)
  }, [imageId])

  useEffect(() => {
    handleGetImage()
  }, [handleGetImage])

  return (
    <S.Main>
      <S.Header>
        <strong>{storeName}</strong>
        <S.ToolBar>
          <img
            src={`/assets/icons/image-gallery-tour/Zoom Maximo plus.svg`}
            color='#fff'
            onClick={() => setOpenImageZoom(<React.Fragment />)}
          />
          <img
            src={`/assets/icons/image-gallery-tour/Expandir.svg`}
            color='#fff'
            onClick={() => {
              zoom !== 3 ? setZoom(3) : setZoom(1)
            }}
          />
          {Number(zoom.toFixed(1)) <= 3 && Number(zoom.toFixed(1)) > 1 ? (
            <img
              src={`/assets/icons/image-gallery-tour/Zoom Menor.svg`}
              color='#fff'
              onClick={() => setZoom((prev) => prev - 0.1)}
            />
          ) : (
            <img
              src={`/assets/icons/image-gallery-tour/Zoom Menor 50 opacidade.svg`}
              color='#ccc'
              style={{ cursor: 'default' }}
            />
          )}

          <div>{(100 * zoom).toFixed(0)}%</div>
          {Number(zoom.toFixed(1)) >= 1 && Number(zoom.toFixed(1)) < 3 ? (
            <img
              src={`/assets/icons/image-gallery-tour/Zoom Menor – 1.svg`}
              color='#fff'
              onClick={() => setZoom((prev) => prev + 0.1)}
            />
          ) : (
            <img
              src={`/assets/icons/image-gallery-tour/Zoom Menor 50 opacidade – 1.svg`}
              color='#ccc'
              style={{ cursor: 'default' }}
            />
          )}
        </S.ToolBar>
      </S.Header>
      <React.Fragment>
        {loading ? (
          <S.Loader>
            <Loader />{' '}
          </S.Loader>
        ) : (
          <React.Fragment>
            <S.CropArea
              fullSize={fullSize}
              zoom={zoom}
              crop={crop}
              ultraSize={ultraSize}
            >
              <S.CropperImage
                onMediaLoaded={(m) => getImageSize(m)}
                image={selectedImage}
                showGrid={false}
                crop={crop}
                minZoom={1}
                zoomSpeed={0.378}
                aspect={1}
                cropSize={{
                  width: windowSize.innerWidth,
                  height: windowSize.innerHeight - 45,
                }}
                zoom={zoom}
                onCropChange={setCrop}
                onZoomChange={setZoom}
              />
            </S.CropArea>
            {allImg.length > 1 && zoom === 1 && (
              <React.Fragment>
                <S.ListImages>
                  {allImg.map((image) => (
                    <S.Image
                      isActual={image.url === selectedImage}
                      key={image.id}
                      src={image.url}
                      onClick={() => setSelectedImage(image.url)}
                    />
                  ))}
                </S.ListImages>
                <S.Footer />
                <S.Buttons>
                  <S.Arrows className='left' isDisabled={isFirstImage}>
                    <FiArrowLeft
                      size={24}
                      color='#fff'
                      onClick={isFirstImage ? () => {} : handlePreviusImage}
                    />
                  </S.Arrows>

                  <S.Arrows className='right' isDisabled={isLastImage}>
                    <FiArrowRight
                      size={24}
                      color='#fff'
                      onClick={isLastImage ? () => {} : handleNextImage}
                    />
                  </S.Arrows>
                </S.Buttons>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    </S.Main>
  )
}

export default ZoomImage
