import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 21px;

  button i.icon {
    margin: 0;
    color: #727885;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    width: 16px;
  }

  button.ql-active {
    background-color: #e7e7e7;
    box-shadow: inset 0px 0px 3px 0px #9f9f9f;
  }

  input[type='file'] {
    display: none;
  }
`

export const LeftSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 7px;

  > button {
    min-width: unset;
  }
`

export const RightSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export const FileInput = styled.label`
  cursor: pointer;
  color: #3455abff;
  border-radius: 4px;
  padding: 0 14px;
  font-size: 14px;
  font-weight: bold;
  position: relative;
  user-select: none;
  height: 33px;
  background-color: transparent;
  line-height: 2.15;

  :hover {
    color: #3455abb3;
    border-color: #3455abb3;
  }

  input {
    display: none;
  }

  > div {
    :nth-child(1) {
      display: flex;
      align-items: center;
      color: black;
      font-weight: normal;
    }
  }
`
