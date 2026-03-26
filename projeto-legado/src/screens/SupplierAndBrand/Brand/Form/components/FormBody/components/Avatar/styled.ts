import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`

interface ImageContainerProps {
  disabled: boolean
}

export const ImageContainer = styled.div<ImageContainerProps>`
  position: relative;
  width: 60px;
  height: 60px;

  &,
  * {
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')} !important;
  }
`

interface RoundedImageProps {
  src: string
}

export const RoundedImage = styled.div<RoundedImageProps>`
  border-radius: 100%;
  width: 60px;
  height: 60px;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  cursor: pointer;

  ${(props) =>
    !props.src
      ? css`
          background-color: #f2f2f2;
          display: flex;
          align-items: center;
          justify-content: center;
        `
      : css`
          background-image: url(${props.src});

          > * {
            display: none;
          }
        `}
`

export const FileInput = styled.label`
  font-size: 14px;
  font-weight: normal;
  color: #3455ab;
  border: 1px solid #3455ab;
  border-radius: 4px;
  padding: 7px 10px;
  cursor: pointer;
  margin-left: auto;

  input {
    display: none;
  }
`
