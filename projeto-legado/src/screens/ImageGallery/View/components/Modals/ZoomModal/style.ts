import { Modal } from 'semantic-ui-react'
import styled, { css } from 'styled-components'

export const Container = styled.div``

export const Header = styled.header`
  width: 100%;
  height: 64px;
  background-color: #3455ab;
  padding: 21px;
  color: #fff;
  text-align: left;
  font: normal normal bold 18px/20px Lato;
`

export const Main = styled.main`
  height: 475px;
  flex: 1;
  padding: 21px 0 6px 0;
  overflow: hidden;

  .ui.loader:after {
    border-color: #3455ab rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1)
      rgba(0, 0, 0, 0.1) !important;
  }
`

export const Content = styled.div`
  display: flex;
  gap: 24px;
  width: 100%;
  height: 100%;
  align-items: center;
`
export const Arrows = styled.div`
  position: absolute;
  width: 28px;
  height: 64px;

  display: flex;
  align-items: center;

  background-color: #ededed;
  color: #adadad;

  &.left {
    justify-content: flex-end;
    border-radius: 0% 100% 100% 0% / 30% 50% 50% 70%;
    left: 0;
    svg {
      right: 4px;
    }
  }

  &.right {
    justify-content: flex-start;
    right: 0;
    border-radius: 100% 0% 0% 100% / 50% 50% 50% 50%;
    svg {
      left: 4px;
    }
  }

  &:hover {
    background-color: #3455ab;
    color: #fff;
    cursor: pointer;
  }
  svg {
    position: relative;
    width: 30px;
    height: 30px;
  }
`

export const MainContent = styled.div`
  display: flex;
  align-self: flex-start;
  gap: 24px;
  width: 100%;
  height: 100%;
  padding-inline: 42px;
`

export const ContentImage = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: flex-end;
  gap: 14px;
`

interface CardProps {
  type: number
}

export const Image = styled.img<CardProps>`
  width: 100%;
  height: 408px;
  object-fit: cover;

  box-sizing: content-box;

  border-radius: 6px 0 0 6px;

  ${(props) =>
    props.type === 1 &&
    css`
       {
        border-left: 6px solid #66bb6a !important;
      }
    `}

  ${(props) =>
    props.type === 2 &&
    css`
       {
        border-left: 6px solid #e23851 !important;
      }
    `}
  ${(props) =>
    props.type === 0 &&
    css`
       {
        border-left: 6px solid #c8c8c8 !important;
      }
    `}
`

export const ImageFullScreen = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 8px;
  margin-right: 8px;

  position: absolute;

  background-color: #ffffff;

  svg {
    width: 24px;
    height: 24px;
    color: #505d6f;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    cursor: pointer;
  }
`

export const ImageOptions = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`

export const ContentData = styled.div`
  width: 454px;
  height: 408px;
  overflow: hidden;
`

export const Footer = styled.footer`
  height: 61px;
  padding: 23px 14px 22px 23px;
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid #dadadb;
`

export const GalleryModal = styled(Modal)`
  margin: 0 !important;
  height: 100vh !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
`

export const Loader = styled.div`
  width: 100%;
  height: 408px;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 9;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const LoadingImage = styled.div`
  width: 100%;
  height: 408px;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: center;
`
