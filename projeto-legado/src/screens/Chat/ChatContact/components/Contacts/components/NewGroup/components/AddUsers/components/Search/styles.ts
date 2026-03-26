import styled from 'styled-components'

export const SearchContainer = styled.div`
  width: 100%;
  padding: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
`

export const SelectUserContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
`

export const SelectUset = styled.div`
  background-color: #3455ab;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 7px 14px;

  & > span {
    text-align: center;
    font: normal normal bold 14px/17px Lato;
    letter-spacing: 0px;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & > svg {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export const SearchInput = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 14px;

  & > div {
    width: 100%;
  }
`
