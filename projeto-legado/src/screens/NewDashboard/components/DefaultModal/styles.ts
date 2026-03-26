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

export const Icons = styled.div`
  max-width: 315px;
  padding: 14px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const BulletOptions = styled.div`
  max-width: 150px;
  margin-left: 20px;

  .wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .item-container {
      width: 100%;
      margin: 8px 0;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .bullet {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #3cc37b;
      margin-right: 4px;
      position: relative;

      span {
        display: inline-block;
        margin-left: 4px;
      }
      .bullet-icon {
        position: absolute;
        right: 0;
        top: 0;
        width: 9px;
        height: 9px;
        border-left: 1px solid #fff;
        border-bottom: 1px solid #fff;
        border-radius: 8px;
      }
    }

    .bullet2 {
      background-color: #e23851;
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
