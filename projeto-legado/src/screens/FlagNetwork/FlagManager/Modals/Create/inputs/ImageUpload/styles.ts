import styled, { css } from 'styled-components'

export const ImageUploadContainer = styled.div<{ $disabled: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin-left: 21px;

  > p {
    font-size: 14px;
    font-weight: normal;
    color: #192338;
    margin-bottom: 7px;
    opacity: ${({ $disabled: disabled }) => (disabled ? '50%' : '100%')};
  }

  > label input {
    visibility: hidden;
    width: 0;
  }
`

interface LabelSubmitProps {
  isDisabled: boolean
}

export const LabelSubmit = styled.label<LabelSubmitProps>`
  -webkit-text-size-adjust: 100%;
  box-sizing: inherit;
  margin: 0;
  overflow: visible;
  padding: 0px 14px;
  border-radius: 4px;
  position: relative;
  height: 33px;
  background-color: transparent;
  border: 1px solid rgb(52, 85, 171);
  -webkit-appearance: button;

  display: flex;
  align-items: center;
  justify-content: center;

  opacity: ${(props) => (props.isDisabled ? 0.45 : 1)};

  & > span {
    -webkit-text-size-adjust: 100%;
    line-height: 1.15;
    text-transform: none;
    font-family: Lato, sans-serif;
    font-weight: bold;
    user-select: none;
    font-size: 14px;
    color: rgb(52, 85, 171);
    box-sizing: inherit;

    &:hover {
      ${(props) =>
        !props.isDisabled &&
        css`
          color: rgba(52, 85, 171, 0.7);
        `}
    }
  }

  &:hover {
    ${(props) =>
      !props.isDisabled &&
      css`
        -webkit-text-size-adjust: 100%;
        cursor: pointer;
        color: rgba(52, 85, 171, 0.7);
        border: 1px solid rgba(52, 85, 171, 0.7);
      `}
  }
`
export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100px;
  width: 133px;
  border: 1px solid #bcbcbc;

  color: #192338;
  font-size: 13px;
  margin-bottom: 14px;
`

export const Image = styled.div<{ $image: string }>`
  background: #e4e4e470 url(${({ $image: image }) => image || ''}) no-repeat
    scroll center;
  background-size: cover;
  position: relative;

  height: 100%;
  width: 100%;

  > div {
    background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5));
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.5s ease-in-out;
  }
  :hover > div {
    opacity: 1;
  }
`

export const Subcontent = styled.div`
  p {
    margin-bottom: 0;
  }

  p:first-child {
    margin-bottom: 1px;
  }
`
