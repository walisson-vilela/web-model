import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
`

export const Header = styled.header`
  padding: 21px;
  font-size: 18px;
  font-weight: bold;
  background-color: #3455ab;
  color: white;
`

export const Subheader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 14px;

  > div:first-child {
    color: #263046cc;
    font-size: 14px;
    font-weight: normal;

    p {
      margin: 0;
    }
  }

  > div:last-child {
    display: flex;
    align-items: center;
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;

  > div:first-child {
    flex: 1;
  }

  .ui.fixed.table th,
  .ui.fixed.table td,
  .ui.fixed.table td > div {
    background-color: #ffffff !important;
  }

  .ui.loader:after {
    border-color: #3455ab rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1)
      rgba(0, 0, 0, 0.1) !important;
  }
`
