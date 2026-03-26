import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 36px;

  margin: 0 auto;

  * img {
    height: 18px;
    cursor: pointer;
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

export const Approvation = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
`

export const Others = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
`

interface RotateProps {
  isLoading: boolean
}

export const Rotate = styled.div<RotateProps>`
  display: flex;
  align-items: center;
  &:hover .rotateOpened {
    display: flex;
  }

  ${(props) =>
    props.isLoading
      ? css`
          opacity: 0.5;
        `
      : css`
          &:hover .rotateOpened {
            display: flex;
          }
        `}
`

export const RotateOpened = styled.div`
  margin-left: -7px;
  bottom: -1px;
  flex-direction: column-reverse;

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
