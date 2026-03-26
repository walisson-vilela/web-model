import styled from 'styled-components'

export const PopUpContent = styled.div`
  width: 280px;
  padding: 13px 14px;
  display: flex;
  flex-direction: column;
  strong {
    font: normal normal 600 16px/19px Lato;
    letter-spacing: 0px;
    color: #ffffff;
    text-shadow: 0px 2px 6px #00000029;
    opacity: 1;
  }
  p {
    width: 208px;
    height: 41px;
    margin-top: 7px;
  }
`

export const Link = styled.span`
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`
