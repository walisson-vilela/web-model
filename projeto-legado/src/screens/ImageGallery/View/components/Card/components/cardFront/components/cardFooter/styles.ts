import styled, { css } from 'styled-components'

import { DirectionProps } from '../../../../../../interface'

export const Container = styled.div<DirectionProps>`
  max-width: ${(props) => (props.direction === 'column' ? '220px' : '220px')};
  display: flex;
  flex-direction: ${(props) => props.direction};
  align-items: center;
  margin: 0 auto;
  gap: 36px;
  ${(props) => {
    if (props.direction === 'column') {
      return css`
        justify-content: center;
      `
    }
  }}

  & > div {
    flex-direction: ${(props) => props.direction};
  }

  * img {
    height: 18px;
    cursor: ${(props) => (props.isHidden ? 'not-allowed' : 'pointer')};
  }

  button {
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
  }

  button:disabled {
    opacity: 0.5;
    cursor: default;
  }
`

interface RotateProps {
  isBlocked: boolean
}

export const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`

export const OthersContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`

export const Rotate = styled.div<RotateProps>`
  display: flex;
  align-items: center;

  ${(props) =>
    props.isBlocked
      ? css`
          opacity: 0.5;
        `
      : css`
          &:hover .rotateOpened {
            display: flex;
          }
        `}
`

export const RotateOpened = styled.div<DirectionProps>`
  ${(props) =>
    props.direction === 'column'
      ? css`
          margin-left: -58px;
          bottom: 209px;
          flex-direction: row-reverse;
        `
      : css`
          margin-left: -7px;
          bottom: 6px;
          flex-direction: column-reverse;
        `}
  position: absolute;

  gap: 7px;

  padding: 6px;
  background: #ffffff;
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #eeeeee;
  border-radius: 4px;
  display: none;

  align-items: center;
  justify-content: space-between;
`

export const Loader = styled.div`
  width: 18px;
  height: 18px;
  position: relative;

  div {
    top: 82% !important;
    left: 82% !important;
  }

  div::before,
  .ui.loader:after,
  .ui.loader:before {
    width: 18px !important;
    height: 18px !important;
  }
`
