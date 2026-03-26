import styled, { css } from 'styled-components'

import { DirectionProps } from '../../../../interface'

interface RotateImageProps extends DirectionProps {
  rotateImg: number
}

export const Container = styled.div<RotateImageProps>`
  margin-top: 14px;
  width: 100% !important;
  overflow: hidden;

  display: flex;
  flex-direction: ${(props) => props.direction};
  gap: 14px;

  ${(props) =>
    props.direction === 'column' &&
    css`
      & {
        width: 100%;
      }
    `}
`

interface ImageProps {
  isBlocked?: boolean
  isLoading?: boolean
  flex: 'row' | 'column'
}

export const ImageWrapper = styled.div<ImageProps>`
  width: 100%;
  height: ${(props) => (props.flex === 'row' ? '280px' : '376px')};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #ccc;

  ${(props) =>
    props.isBlocked
      ? css`
          & > .overlay {
            span {
              width: 194px;
              height: 119px;
              color: #fff;
              background-color: transparent;
              border-radius: 0;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              gap: 8px;
              font: normal normal normal 18px/22px Lato;
              text-align: center;
            }

            opacity: 1;
          }
        `
      : css`
          &:hover > .overlay {
            cursor: pointer;
            opacity: 1;

            span {
              display: flex;
            }
          }
        `}

  ${(props) =>
    props.isLoading && !props.isBlocked
      ? css`
          .overlay {
            display: none;
            opacity: 0;
          }
        `
      : css`
          &:hover > .overlay {
            cursor: pointer;
            opacity: 1;

            span {
              display: flex;
            }
          }
        `}
`
export const Loader = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 9;
`

interface ImageBlocked {
  isBlocked: boolean
  isLoading?: boolean
}

export const Overlay = styled.div<ImageBlocked>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0;

  background-color: ${(props) => (props.isBlocked ? '#08236B80' : '#26304680')};
  opacity: 0;

  transition: opacity 175ms ease;

  span {
    width: 60px;
    height: 35px;
    font: normal normal bold 14px/17px Lato;
    background: #ffffff90;
    color: #fff;
    border-radius: 8px;

    display: none;
    align-items: center;
    justify-content: center;
  }
`
