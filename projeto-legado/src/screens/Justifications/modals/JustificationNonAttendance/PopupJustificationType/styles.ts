import styled from 'styled-components'

export const Container = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const Title = styled.div`
  align-self: center;
  margin-top: 14px;

  & > strong {
    font: normal normal normal 14px/17px Lato;
    letter-spacing: 0px;
    color: #192338;
  }
`

export const Content = styled.div`
  margin-top: 32px;
  align-self: center;
  display: flex;
  flex-direction: column;
  gap: 32px;
`

export const Type = styled.div`
  display: flex;
  justify-content: center;
  gap: 14px;
`

export const Motivation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 7px;

  & > span {
    font: normal normal normal 14px/17px Lato;
    letter-spacing: 0px;
    color: #192338;
  }

  & > div {
    cursor: pointer;
    word-wrap: break-word;
    line-height: 1em;
    white-space: normal;
    outline: 0;
    -webkit-transform: rotateZ(0);
    transform: rotateZ(0);
    min-width: 14em;
    min-height: 2.71428571em;
    background: #fff;
    display: inline-block;
    padding: 0.78571429em 2.1em 0.78571429em 1em;
    color: rgba(0, 0, 0, 0.87);
    box-shadow: none;
    border: 1px solid rgba(34, 36, 38, 0.15);
    border-radius: 0.28571429rem;
    transition: box-shadow 0.1s ease, width 0.1s ease;

    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;

    z-index: 999 !important;

    & > .ui.dropdown {
      cursor: pointer;
      position: relative;
      display: inline-block;
      outline: 0;
      text-align: left;
      transition: box-shadow 0.1s ease, width 0.1s ease;
      -webkit-tap-highlight-color: transparent;
      background: #fff !important;
    }
    & > .menu {
      width: 100% !important;
      z-index: 999 !important;
      overflow-y: auto !important;
      max-height: 140px;
    }
  }
`

export const Footer = styled.div`
  width: 130%;
  border-top: 1px solid #dadadb;
  margin-top: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 14px;
`
