import styled from 'styled-components'

export const MotivationContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const Motivation = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 14px;
  border-right: 1px solid #e2e2e3;

  & > strong {
    text-align: center;
    font: normal normal bold 16px/19px Lato;
    letter-spacing: 0px;
    color: #192338;
  }
`

export const TypeRadius = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
`

export const InputList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
`

export const Input = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 7px;

  & > label {
    font: normal normal normal 14px/17px Lato;
    letter-spacing: 0px;
    color: #192338;
  }

  & > div {
    width: 280px;
  }
`

export const FileContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 7px;

  & > span {
    display: flex;
    align-items: center;

    & > svg {
      cursor: pointer;
    }
  }
`

export const File = styled.label`
  cursor: pointer;
  background: #3455ab;
  border-radius: 4px;
  border: 1px solid #cccccc;
  padding: 5px 15px;
  display: inline-block;

  align-self: flex-start;

  &:hover {
    background: #9aa9d5;
  }

  & > span {
    font: normal normal bold 14px/17px Lato;
    letter-spacing: 0px;
    color: #ffffff;
  }

  & > input {
    display: none;
  }
`

export const AddEvent = styled.div`
  width: 100%;
  height: 35px;

  & > button {
    cursor: pointer;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;

    background-color: #3455ab;
    color: #fff;

    :disabled {
      background-color: #e0e1e2;
      color: #b0b0b0;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      background: #9aa9d5;
    }

    & > span {
      font: normal normal bold 14px/17px Lato;
      letter-spacing: 0px;
      color: #ffffff;
    }
  }
`
