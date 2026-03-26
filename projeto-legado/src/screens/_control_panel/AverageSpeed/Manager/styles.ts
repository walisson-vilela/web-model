import styled from 'styled-components'

export const Label = styled.span`
  cursor: pointer;
`

export const Wrapper = styled.div`
  padding: 14px;
  width: 240px;
  height: 208px;
  strong {
    text-align: center;
    font: normal normal bold 14px/17px Lato;
    letter-spacing: 0px;
    color: #ffffff;
    opacity: 1;
  }

  div {
    margin-top: 11px;
    span {
      text-align: left;
      font: normal normal 600 13px/24px Lato;
      letter-spacing: 0px;
      color: #ffffff;

      h2 {
        text-align: left;
        font: normal normal bold 18px/24px Lato;
        letter-spacing: 0px;
        color: #ffffff;
        opacity: 1;
      }
    }
  }
`
