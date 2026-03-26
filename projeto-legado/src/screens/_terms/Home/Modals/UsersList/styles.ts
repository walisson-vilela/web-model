import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const Header = styled.header`
  padding: 21px;
  background-color: #3455ab;
  text-align: left;
  font: normal normal bold 18px/20px Lato;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
`

export const UserInfo = styled.div`
  padding: 31px 0 21px 37px;
  display: flex;
  flex-direction: column;

  strong {
    text-align: left;
    font: normal normal bold 18px/20px Lato;
    letter-spacing: 0px;
    color: #192338;
    opacity: 1;
    margin-bottom: 7px;
  }
  span,
  b {
    color: #192338;

    & + span {
      margin-top: 7px;
      display: block;
    }
  }
`

export const Main = styled.div`
  flex: 1;
  padding: 0 21px;
`

export const Footer = styled.footer`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 21px;
`
