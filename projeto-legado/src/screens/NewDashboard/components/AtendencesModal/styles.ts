import styled, { css } from 'styled-components'

export const Container = styled.div`
  width: 100%;
  max-width: 1366px;
  height: 768px;
  padding: 8px;
  display: flex;
  flex-direction: column;

  section {
    flex: 1;
    width: 100%;
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px;

    .modal-widget15 {
      width: 1058px;
      height: 600px;
    }

    .custom-with-buttons {
      width: 86%;
    }
  }

  footer {
  }
`

export const Header = styled.div`
    width:1058px;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
    padding-top:8px;
    div{
        display:flex;
        flex-direction:column;
        strong{
         font-size:15px;
        }

        span{
            font-size: 14px;
            display:inline-block;
            margin-top:8px;
            color:grey;
        }

    }
    svg{
        cursor:pointer;
    }
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
  margin: 0 8px;
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
