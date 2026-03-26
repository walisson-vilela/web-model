import styled from 'styled-components'

export const Header = styled.div`
  width: 100%;
  height: 64px;
  padding: 21px;
  margin: 0;
  background-color: #3455ab;

  & > strong {
    font: normal normal bold 18px/20px Lato;
    color: #ffffff;
  }
`

export const Content = styled.div`
  width: 100%;
  height: 422px;
  display: flex;
  flex-direction: column;
`

export const User = styled.div`
  width: 100%;
  padding-bottom: 24px;
  display: flex;
  flex-direction: column;

  & > span {
    font: normal normal normal 16px/15px Lato;
    letter-spacing: 0px;
    color: #192338;
  }
`

export const TabContainter = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`
