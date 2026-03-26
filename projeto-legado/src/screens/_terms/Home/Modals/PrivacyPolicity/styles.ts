import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100% !important;
  display: flex;
  flex-direction: column;
`

export const Header = styled.header`
  padding: 21px;
  display: flex;
  flex-direction: column;

  strong {
    font-size: 20px;
    color: #192338;
    margin-bottom: 7px;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      flex: 1;
    }

    span,
    b {
      color: #192338;
    }

    cursor: pointer;
  }
`

export const Main = styled.main`
  border-top: 1px solid #dadadb;
  border-bottom: 1px solid #dadadb;
  flex: 1;
  min-height: 466px;
  padding: 21px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  p {
    margin-top: 16px;
    text-transform: uppercase;
  }
`

export const LoaderContainer = styled.div`
  width: 100%;
  min-height: 466px;
  background-color: #fff;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .ui.loader {
    position: absolute !important;
  }
`

export const Footer = styled.footer`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 21px;
`
