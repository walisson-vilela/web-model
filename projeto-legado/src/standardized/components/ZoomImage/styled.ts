import Cropper from 'react-easy-crop'
import styled, { css } from 'styled-components'

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 45px;
  z-index: 5;
  padding: ${({ theme }) => theme.spacings.s3}
    ${({ theme }) => theme.spacings.s4};

  background-color: #323232;
`

export const ToolBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
`

interface CropAreaProps {
  fullSize: boolean
  zoom: number
  crop: { x: number; y: number }
  ultraSize: boolean
}

export const CropArea = styled.div<CropAreaProps>`
  flex: 1;
  position: relative;

  & div > img {
    ${(props) =>
      !props.fullSize
        ? css`
            transform: none !important;
          `
        : css`
            transform: scale(${props.zoom}) !important;
          `}

    ${(props) =>
      props.ultraSize &&
      css`
        transform: translate(${props.crop.x}px, ${props.crop.y}px) rotate(0deg)
          scale(${props.zoom}) !important;
      `}
  }

  & div > div {
    border: none;
  }
`

export const CropperImage = styled(Cropper)`
  width: 100% !important;
  height: 100% !important;
  z-index: -999;
`
export const Modal = styled.div`
  &.ui.modal {
    margin: 0 !important;
    width: 100% !important;
    height: 100% !important;

    position: relative;
    display: flex !important;
    flex-direction: column;

    background-color: #292929;
    color: ${({ theme }) => theme.colors.white};
  }
`
