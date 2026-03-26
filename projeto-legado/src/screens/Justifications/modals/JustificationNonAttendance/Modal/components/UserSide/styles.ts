import styled from 'styled-components'

export const User = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 21px;

  & > span {
    font: normal normal normal 16px/15px Lato;
    letter-spacing: 0px;
    color: #192338;
  }
`

export const JustificationData = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 21px;
  border: 1px solid #e2e2e3;
`

export const Buttons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  align-self: flex-end;
`

interface ButtonProps {
  isDisabled?: boolean
}

export const Button = styled.div<ButtonProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;
  cursor: ${(props) => (props.isDisabled ? 'pointer' : 'not-allowed')};
  & > div {
    opacity: ${(props) => (props.isDisabled ? 0.5 : 1)};
  }

  & > strong {
    font: normal normal bold 14px/15px Lato;
    letter-spacing: 0px;
    color: #192338;
  }
`
