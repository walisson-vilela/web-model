import styled from 'styled-components'

export const Header = styled.div`
  width: 100%;
  height: 64px;
  background-color: #3455ab;
  padding: 21px;
  color: #fff;
  font: normal normal bold 18px/20px Lato;
`

export const Main = styled.main`
  flex: 1;
  padding: 21px 21px 16px 21px;
  overflow: hidden;
`

export const Content = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 16px;
`

export const ContentHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > label {
    max-width: 200px !important;
  }
`

export const Options = styled.div`
  width: 100%;
  height: 160px;

  position: relative;

  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;

  & div > .ui.checkbox input:not([type='radio']):indeterminate ~ .box::before,
  .ui.checkbox input:not([type='radio']):indeterminate ~ label:before {
    border: 1px solid #3455ab;
  }

  & div > .ui.checkbox input:not([type='radio']):indeterminate ~ .box:after,
  .ui.checkbox input:not([type='radio']):indeterminate ~ label:after {
    content: '';
    display: block;
    position: absolute;
    top: 4px;
    left: 4px;
    width: 9px;
    height: 9px;
    background-color: #3455ab;
    border: 1px solid #3455ab;
    border-radius: 2px;
  }
`

export const Footer = styled.footer`
  width: 100%;
  padding: 16px 0 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #dadadb;
  strong {
    font-weight: bold;
  }
`

export const LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;

  & > .ui.loader:after {
    border-color: #3455ab rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1)
      rgba(0, 0, 0, 0.1) !important;
  }
`
