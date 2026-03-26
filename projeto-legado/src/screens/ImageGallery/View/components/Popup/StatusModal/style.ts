import styled from 'styled-components'

export const Container = styled.div`
  width: 304px;
  height: 324px;
  border-radius: 4px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const Header = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;

  strong {
    font: normal normal bold 14px/24px Lato;
    color: #000000cc;
  }

  span {
    font: normal normal normal 14px/17px Lato;
    color: #192338;
  }
`

export const Observation = styled.div`
  width: 100%;
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 7px;

  span {
    font: normal normal normal 14px/17px Lato;
    color: #b0b0b0;
  }
`

export const Content = styled.div`
  width: 100%;
  height: 140px;
  border: 1px solid #dadadb;
  overflow-y: auto;
  margin-bottom: 14px;
  padding: 7px;
`

export const Footer = styled.footer`
  height: 61px;
  padding: 23px 14px 22px 23px;
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid #dadadb;
`
