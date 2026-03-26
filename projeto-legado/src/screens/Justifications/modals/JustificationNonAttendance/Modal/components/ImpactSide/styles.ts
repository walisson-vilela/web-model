import styled from 'styled-components'

export const Impact = styled.div`
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

export const ImpactData = styled.div`
  width: 100%;
  max-height: 91.5%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #e2e2e3;
`

export const SearchDiv = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid #e2e2e3;
`

export const Search = styled.div`
  width: 50%;
  height: 100%;
  border-left: 1px solid #e2e2e3;
  div > div > form > div {
    input {
      height: 44px;
      border: none !important;

      &:autofill {
        background-color: transparent !important;
      }
    }
  }
`

export const List = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 7px;

  padding: 7px;

  overflow-y: auto;
  overflow-x: hidden;
`

export const LoaderButtonContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  .ui.loader:after {
    border-color: #3455ab rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1)
      rgba(0, 0, 0, 0.1) !important;
  }
`
