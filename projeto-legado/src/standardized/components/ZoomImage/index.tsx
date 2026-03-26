import { useEffect, useState } from 'react'

import { MwIcon } from '@mw-kit/mw-ui'
import { MediaSize } from 'react-easy-crop'
import { Modal as ModalZoom } from 'semantic-ui-react'

import ExpandIcon from '../../../assets/icons/expand.svg?react'

import * as S from './styled'

interface IZoomImage {
  url: string
  label: string
  onClose: () => void
}

interface IimgSize {
  width: number
  height: number
}

const getImageSize = (
  Media: MediaSize,
  value: React.Dispatch<React.SetStateAction<IimgSize | undefined>>,
): void => {
  const size: IimgSize = {
    width: Media.width,
    height: Media.height,
  }
  value(size)
}

const getWindowSize = () => {
  const { innerWidth, innerHeight } = window
  return { innerWidth, innerHeight }
}

const ZoomImage = ({ url, label, onClose }: IZoomImage) => {
  const [zoom, setZoom] = useState(1)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [imgSize, setImgSize] = useState<IimgSize>()
  const [windowSize, setWindowSize] = useState(getWindowSize())
  const [fullSize, setFullSize] = useState<boolean>(false)
  const [ultraSize, setUltraSize] = useState<boolean>(false)

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

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize())
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  return (
    <ModalZoom
      size='fullscreen'
      as={S.Modal}
      dimmer={{
        style: { padding: 0 },
      }}
      open
    >
      <S.Header>
        <strong>{label}</strong>
        <S.ToolBar>
          <MwIcon
            type='feather'
            icon='minimize'
            color='white'
            width='14px'
            strokeWidth='4px'
            onClick={onClose}
          />

          <MwIcon
            type='svg'
            icon={ExpandIcon}
            color='white'
            width='20px'
            onClick={() => {
              zoom !== 3 ? setZoom(3) : setZoom(1)
            }}
          />

          <MwIcon
            type='feather'
            icon='zoom_out'
            color='white'
            width='17px'
            height='17px'
            strokeWidth='3px'
            {...(Number(zoom.toFixed(1)) <= 3 && Number(zoom.toFixed(1)) > 1
              ? { onClick: () => setZoom((prev) => prev - 0.1) }
              : { style: { opacity: '.5' } })}
          />

          <div>{(100 * zoom).toFixed(0)}%</div>

          <MwIcon
            type='feather'
            icon='zoom_in'
            color='white'
            width='17px'
            height='17px'
            strokeWidth='3px'
            {...(Number(zoom.toFixed(1)) >= 1 && Number(zoom.toFixed(1)) < 3
              ? { onClick: () => setZoom((prev) => prev + 0.1) }
              : { style: { opacity: '.5' } })}
          />
        </S.ToolBar>
      </S.Header>

      <S.CropArea
        fullSize={fullSize}
        zoom={zoom}
        crop={crop}
        ultraSize={ultraSize}
      >
        <S.CropperImage
          onMediaLoaded={(m) => getImageSize(m, setImgSize)}
          image={url}
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
    </ModalZoom>
  )
}
export default ZoomImage
