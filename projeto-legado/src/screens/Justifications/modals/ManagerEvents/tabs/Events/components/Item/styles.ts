import styled from 'styled-components'

export const ListItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border: 1px solid #e2e2e3;
  border-radius: 4px;
  padding: 7px;
`

export const ListInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 7px;
`

export const ListRemove = styled.div`
  display: flex;
  height: 24px;
  align-items: center;
  align-self: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    border-bottom: 1px solid #192338;
  }

  & > span {
    font: normal normal normal 14px/17px Lato;
    letter-spacing: 0px;
    color: #192338;
  }
`
