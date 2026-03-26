import styled from 'styled-components'

import MwButton from '../Button'

import type { StyledZoomProps } from './interfaces'

export const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`

export const Container = styled.div<StyledZoomProps>`
  position: relative;
  display: inline-flex;

  &,
  ${Image} {
    width: ${({ $width: width }) => {
      switch (typeof width) {
        case 'string':
          return width
        case 'number':
          return `${width}px`
        default:
          return 'auto'
      }
    }};

    height: ${({ $height: height }) => {
      switch (typeof height) {
        case 'string':
          return height
        case 'number':
          return `${height}px`
        default:
          return 'auto'
      }
    }};
  }
`

export const Dimmer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.getColor('greyishBlue', 50)};
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.5s;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`

export const Button = styled(MwButton)`
  background-color: ${({ theme }) => theme.getColor('white', 50)};
`

export const ModalContent = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  img {
    max-height: 100%;
    max-width: 100%;
  }
`
