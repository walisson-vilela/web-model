import styled from 'styled-components'

export const ButtonContainer = styled.div`
  width: 100%;
  border-top: 1px solid #eaeaea;
`

export const ButtonInput = styled.button`
  width: 100%;
  height: 55px;
  margin-top: 22px;
  outline: none;
  border: none;
  background-color: #3455ab;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  & > span {
    text-align: center;
    font: normal normal bold 18px/22px Lato;
    color: #ffffff;
  }
`
