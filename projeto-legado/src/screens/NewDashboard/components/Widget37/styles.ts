import styled from 'styled-components'

export const Container = styled.div`
  width: 19.5%;
  height: 288px;
  padding: 14px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #0000001a;
  border-radius: 5px;
  opacity: 1;
  padding: 14px;

  section {
    width: 100%;

    .title {
      color: #000;
    }

    strong {
      font: normal normal bold 15px Lato;
      letter-spacing: 0px;
      color: #505d6f;
      opacity: 1;
      margin: 0;
    }
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 70px;

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

    &:nth-child(1) {
      text-align: right;
    }
  }
`

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px;

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin: 0 8px;
    strong {
      font: normal normal bold 15px Lato;
      letter-spacing: 0px;
      color: #505d6f;
      opacity: 1;
      margin: 0;

      span {
        display: inline-block;
        width: 100%;
        font: normal normal medium 14px Lato;
        letter-spacing: 0px;
        color: #6b7686;
        opacity: 1;
      }
    }

    & + div {
      border-left: 1px solid #9aa1a9;
      padding-left: 14px;
      align-items: flex-start;
    }
  }
`
