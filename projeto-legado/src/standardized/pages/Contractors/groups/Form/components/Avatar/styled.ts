import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`

export const ImageContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 60px;
`

interface RoundedImageProps {
  src?: string
}

export const RoundedImage = styled.div<RoundedImageProps>`
  border-radius: 100%;
  width: 60px;
  height: 60px;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;

  & > span {
    font-weight: 700;
    font-size: 16px;
  }

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
