import styled from 'styled-components'

export const Header = styled.div`
  width: 100%;
  height: 64px;
  background-color: #3455ab;
  padding: 21px;
  color: #fff;
  text-align: left;
  font: normal normal bold 18px/20px Lato;
`

export const Main = styled.main`
  flex: 1;
  padding: 21px;
  overflow: hidden;

  .ui.loader:after {
    border-color: #3455ab rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1)
      rgba(0, 0, 0, 0.1) !important;
  }
`

export const Content = styled.div`
  display: flex;
  align-items: center;

  flex-direction: column;

  gap: 14px;
  width: 100%;
  height: 100%;
`

export const ContentHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Motivation = styled.div`
  width: 100%;
  max-height: 140px;
  position: relative;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`

export const Notification = styled.div`
  width: 100%;
  padding: 14px;

  background: #fffaf3 0% 0% no-repeat padding-box;
  border: 1px solid #ccbea0;
  border-radius: 4px;

  p {
    font: normal normal normal 14px/24px Lato;
    color: #7a4d05cc;
  }
`

export const Footer = styled.footer`
  width: 100%;
  padding-top: 14px;
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #dadadb;
`

export const LoaderContainer = styled.div`
  width: 100%;
  height: 120px;
`
