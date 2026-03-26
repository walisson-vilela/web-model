import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 127px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #0000001a;
  opacity: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h4 {
    font: normal normal bold 18px/22px Lato;
    letter-spacing: 0px;
    color: #505d6f;
    opacity: 1;
    margin: 0;
  }

  strong {
    font: normal normal bold 15px Lato;
    letter-spacing: 0px;
    color: #505d6f;
    opacity: 1;
    margin: 0;
  }
`

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 8px;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 14px;
    strong {
      font: normal normal bold 15px Lato;
      letter-spacing: 0px;
      color: #505d6f;
      opacity: 1;
      margin: 0;

      span {
        font: normal normal medium 14px/17px Lato;
        letter-spacing: 0px;
        color: #6b7686;
        opacity: 1;
      }
    }

    & + div {
      border-left: 1px solid #9aa1a9;
      padding-left: 14px;
    }
  }
`
