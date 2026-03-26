import styled, { css } from 'styled-components'

export const PopupContainer = styled.div`
  width: 450px;
  height: 270px;
  display: flex;
  flex-direction: column;
  gap: 7px;
`

export const PopupHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`

export const PopupInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  & > strong {
    font: normal normal 900 16px/24px Lato;
    color: #000000cc;
  }

  & > span {
    font: normal normal normal 14px/24px Lato;
    color: #000000cc;

    & > strong {
      font: normal normal 900 14px/24px Lato;
      color: #000000cc;
    }
  }
`

export const PopupSearch = styled.div``

export const PopupBody = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  gap: 7px;
`

export const PopupList = styled.div`
  width: 100%;
  display: flex;
  border-top: 1px solid #e2e2e2;
  align-items: center;
  padding: 7px;
  gap: 8px;

  & > img {
    width: 35px;
    height: 35px;

    border-radius: 100%;
  }

  & > strong {
    font: normal normal medium 14px/17px Lato;
    color: #263046;
  }

  & > span {
    font: normal normal medium 14px/17px Lato;
    color: #263046;
    opacity: 0.5;
  }
`

interface RoundedImageProps {
  src?: string
}

export const RoundedImage = styled.div<RoundedImageProps>`
  border-radius: 100%;
  width: 35px;
  height: 35px;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;

  ${(props) => {
    if (!props.src) {
      return css`
        background-color: #f2f2f2;
        display: flex;
        align-items: center;
        justify-content: center;
      `
    }

    return css`
      background-image: url(${props.src});

      > * {
        display: none;
      }
    `
  }}
`
