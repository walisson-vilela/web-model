import styled from 'styled-components'

export const Container = styled.div`
  height: 475px;
  display: flex;
  flex-direction: column;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Title = styled.p`
  margin: 0;
  font-size: 16px;
  color: #162d48;
`

export const Search = styled.div`
  display: flex;
  align-items: center;
  position: relative !important;

  input {
    min-width: 320px;
  }
`

export const DropDown = styled.div`
  margin-left: 16px;

  & > div > button {
    position: relative !important;
  }
`

export const Main = styled.div`
  height: 100%;
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`
