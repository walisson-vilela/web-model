import Cropper from 'react-easy-crop'
import styled, { css } from 'styled-components'

export const Main = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #292929;
  color: #ffffff;
`

export const Header = styled.header`
  width: 100%;
  height: 45px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  background-color: #323232;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 21px;
`

export const ToolBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;

  img {
    cursor: pointer;
  }
`

interface CropAreaProps {
  fullSize: boolean
  zoom: number
  crop: { x: number; y: number }
  ultraSize: boolean
}

export const CropArea = styled.div<CropAreaProps>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 45px;
  height: calc(100vh - 53px);

  & div > img {
    height: calc(100% - 46px) !important;
    max-height: none !important;
    top: 46px !important;
    ${(props) =>
      !props.fullSize
        ? css`
            transform: none !important;
          `
        : css`
            transform: translate(${props.crop.x / 50}px, ${props.crop.y}px)
              rotate(0deg) scale(${props.zoom}) !important;
          `}

    ${(props) =>
      props.ultraSize &&
      css`
        transform: translate(${props.crop.x}px, ${props.crop.y}px) rotate(0deg)
          scale(${props.zoom}) !important;
      `}
  }

  & > div {
    width: 100% !important;
    height: calc(100% - 8px) !important;
  }

  & div > div {
    margin-top: 44px !important;
    border: none !important;
    box-shadow: none !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    width: 100% !important;
    height: 100% !important;
    z-index: 100 !important;
  }
`

export const CropperImage = styled(Cropper)`
  width: 100% !important;
  height: 100% !important;
  z-index: -999;
`

export const Footer = styled.div`
  width: 100%;
  height: 8px;
  background-color: #323232;
`

export const ListImages = styled.div`
  width: fit-content;
  height: 60px;
  padding: 8px;

  z-index: 120;

  position: absolute;
  bottom: 40px;
  left: 0;
  right: 0;
  margin: auto;

  display: flex;
  align-items: center;
  gap: 8px;

  background: #00000080 0% 0% no-repeat padding-box;
  border: 1px solid #707070;
`

interface ImageProps {
  isActual: boolean
}

export const Image = styled.img<ImageProps>`
  width: 60px;
  height: 45px;
  object-fit: cover;
  cursor: pointer;
  border: ${(props) => props.isActual && '1px solid #ffffff'};
`

export const Buttons = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;

  display: flex;
  align-items: center;
`

interface ArrowsDisabled {
  isDisabled: boolean
}

export const Arrows = styled.div<ArrowsDisabled>`
  position: absolute;
  width: 28px;
  height: 64px;

  z-index: 120;

  display: flex;
  align-items: center;

  ${(props) =>
    props.isDisabled
      ? css`
          display: none;
        `
      : css`
          background: #ededed80 0% 0% no-repeat padding-box;
          display: flex;

          &:hover {
            background: #3455ab 0% 0% no-repeat padding-box;
            opacity: 1;
            cursor: pointer;
          }
        `}

  &.left {
    justify-content: flex-end;
    border-radius: 0% 100% 100% 0% / 30% 50% 50% 70%;
    left: 0;
  }

  &.right {
    justify-content: flex-start;
    right: 0;
    border-radius: 100% 0% 0% 100% / 50% 50% 50% 50%;
  }
`

export const Loader = styled.div`
  width: 100%;
  height: 100%;
`
