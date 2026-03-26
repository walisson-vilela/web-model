import styled from 'styled-components'

export const SearchContainer = styled.div`
  width: 100%;
  padding: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const SearchInput = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 14px;

  & > div {
    width: 100%;
  }
`

export const SearchFilterInput = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`
