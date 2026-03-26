import styled, { css } from 'styled-components'

export const Container = styled.div`
  width: 81%;
  height: 288px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #0000001a;
  border-radius: 5px;
  opacity: 1;
  margin-left: 14px;
  padding: 14px;
  img {
    cursor: pointer;
  }

  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 8px 0;
    padding-bottom: 16px;

    svg {
      cursor: pointer;
    }

    strong {
      font: normal normal bold 15px Lato;
      letter-spacing: 0px;
      color: #000;
      opacity: 1;
      margin: 0;
    }
  }
  .wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .widget31 {
    width: 85%;
    height: 200px;
  }
`

interface ButtonProps {
  btn1: boolean
  btn2: boolean
  btn3: boolean
  btn4: boolean
}

export const Buttons = styled.div<ButtonProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  width: 100px;
  button {
    width: 100%;
    height: 30px;
    margin: 4px 0;
    background: #fff;
    border: 1px solid #1e63a3;
    border-radius: 5px;
    font-size: 12px;
    cursor: pointer;
  }

  button {
    border: 1px solid rgb(211, 211, 211);
    color: rgb(211, 211, 211);
  }
  .btn1 {
    ${(props) =>
      props.btn1 &&
      css`
        background-color: rgb(52, 85, 171);
        color: #fff;
      `}
  }

  .btn2 {
    ${(props) =>
      props.btn2 &&
      css`
        background-color: rgb(52, 85, 171);
        color: #fff;
      `}
  }

  .btn3 {
    ${(props) =>
      props.btn3 &&
      css`
        background-color: rgb(52, 85, 171);
        color: #fff;
      `}
  }

  .btn4 {
    ${(props) =>
      props.btn4 &&
      css`
        background-color: rgb(52, 85, 171);
        color: #fff;
      `}
  }
`
