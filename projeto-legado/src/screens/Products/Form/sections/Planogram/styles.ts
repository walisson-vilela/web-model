import styled, { css } from 'styled-components'

export * from '../../styles'

interface ImageContainerProps {
  size: 'normal' | 'big'
  src?: string
}

export const ImageContainer = styled.div<ImageContainerProps>`
  background-color: ${({ theme }) => theme.colors.iceWhite};
  width: ${({ size }) => (size === 'normal' ? '120px' : '380px')};
  height: ${({ size }) => (size === 'normal' ? '90px' : '285px')};
  cursor: default;
  border: 1px solid ${({ theme }) => theme.colors.lightestGrey};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  border-radius: 5px;

  ${({ src }) =>
    src &&
    css`
      background-image: url(${src});
    `}
`

export const Description = styled.div`
  text-align: center;

  p {
    display: block;
    margin: 0;
    color: ${({ theme }) => theme.colors.silver};
  }
`
