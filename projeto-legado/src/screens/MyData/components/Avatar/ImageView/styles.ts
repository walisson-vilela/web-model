import styled from 'styled-components'

interface ImageViewerProps {
  src: string
}

export const ImageViewer = styled.div<ImageViewerProps>`
  background-image: ${({ src }) => `url(${src})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 400px;
`

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
