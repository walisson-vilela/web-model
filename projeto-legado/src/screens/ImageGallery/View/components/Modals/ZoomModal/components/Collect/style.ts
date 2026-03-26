import { Modal } from 'semantic-ui-react'
import styled, { css } from 'styled-components'

export const Content = styled.div`
  width: 100%;
  height: calc(100% - 66px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const LoaderContainer = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100% !important;
`

export const Header = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const HeaderInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3.5px;

  strong {
    font: normal normal bold 14px/17px Lato;
    color: #000000;
    svg {
      margin-left: 8px;
    }
  }
  span {
    font: normal normal medium 13px/16px Lato;
    color: #505d6f;
  }
`

export const Form = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const PDF = styled.div`
  width: 44px;
  height: 21px;

  font: normal normal 600 10px/12px Lato;

  display: flex;
  align-items: center;
  justify-content: center;

  p {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;
  }

  color: #b2b2b2;
  border: 1px solid #b2b2b2;
  border-radius: 10px;

  &:hover {
    background-color: #3455ab;
    border: 1px solid #3455ab;
    color: #fff;
    cursor: pointer;
  }
`

export const PDFDownload = styled.div`
  width: 44px;
  height: 21px;

  font: normal normal 600 10px/12px Lato;

  display: flex;
  align-items: center;
  justify-content: center;

  p {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;
    position: absolute;

    div {
      width: 10px;
      height: 10px;

      .ui.loader:after,
      .ui.loader:before {
        width: 10px;
        height: 10px;
      }
    }
  }

  border-radius: 10px;
  color: #b2b2b2;
  border: 1px solid #b2b2b2;
  border-radius: 10px;
`

export const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 14px;
  overflow-y: auto;
`

export const Wrapper = styled.div`
  width: 390px;
  height: 100%;
  display: flex;
  flex-direction: column;
  & > div:not(:first-child) {
    border-top: 1px solid #ccc;
    padding-top: 14px;
  }
`

export const Info = styled.div`
  display: block;
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 14px;

  span {
    display: flex;
    align-items: center;
    color: #192338;
    gap: 7px;

    svg:hover {
      cursor: pointer;
    }
  }
`

export const Images = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
`

export const Check = styled.div`
  margin-top: 21px;
  width: 100%;
  display: flex;

  margin-left: 2px;

  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  span,
  svg {
    cursor: pointer;
  }
`

export const PopupContent = styled.div`
  width: 429px;
  p {
    margin: 7px 0;
    color: #fff;
    font: normal normal normal 14px/24px Lato;
  }
`

export const Questions = styled.fieldset`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  border: 1px solid #b2b2b2;

  & > legend {
    margin-bottom: 14px;
    padding-inline: 7px;
    span {
      max-width: 350px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
    }
  }

  & > div {
    margin-bottom: 14px;
  }

  & > div:nth-child(n + 3) {
    border-top: 1px solid #b2b2b2;
    padding-top: 14px;
  }
`

export const Answer = styled.div`
  display: block;
  display: flex;
  flex-direction: column;
  gap: 14px;

  span {
    display: flex;
    align-items: center;
    color: #192338;
    gap: 7px;
  }
  img {
    width: 64px;
    height: 46px;
    object-fit: cover;
  }
`

export const Approvation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  span {
    color: #ccc;
  }
`

export const GalleryModal = styled(Modal)`
  margin: 0 !important;
  height: 100vh !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
`

interface ImageStatus {
  status: string
}

export const ImageWrapper = styled.div<ImageStatus>`
  width: 64px;
  height: 46px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .status {
    position: absolute;
    top: -6px;
    right: -6px;

    width: 24px;
    height: 24px;

    border-radius: 50%;
    border: 2px solid #ffffff;

    display: flex;
    align-items: center;
    justify-content: center;

    z-index: 1;

    ${(props) =>
      props.status === 'A'
        ? css`
            background-color: #66bb6a;
          `
        : props.status === 'R' &&
          css`
            background-color: #e23851;
          `}
  }

  &:hover > .overlay {
    cursor: pointer;
    opacity: 1;
    span {
      display: flex;
    }
  }
`

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0;

  background-color: #26304680;
  opacity: 0;

  transition: opacity 175ms ease;

  span {
    width: 46px;
    height: 18px;
    font: normal normal bold 12px/15px Lato;
    background: #ffffff90;
    color: #fff;
    border-radius: 4px;

    display: none;
    align-items: center;
    justify-content: center;
  }
`
