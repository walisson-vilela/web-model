import styled from 'styled-components'

export const Container = styled.div`
  height: 100%;
  width: 477px;

  img {
    width: 145px;
    height: 145px;
    border-radius: 50%;
  }
`

export const Content = styled.div`
  padding: 21px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const Form = styled.form`
  margin-top: 22px;
  width: 100%;

  input {
    width: 100%;
    height: 35px;
    border: 1px solid #c8c8c8;
    border-radius: 4px;
    padding: 9px 14px;

    &[type='text'] {
      font-size: 14px;
      color: #192338;
    }
  }
`

export const GroupInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 37px;

  div {
    display: flex;
    align-items: center;
    span {
      padding-left: 7px;
      color: #26304680;
    }
  }

  button {
    display: flex;
    align-items: center;
    padding: 14px;
    margin-top: 14px;
    width: 146px;
    height: 41px;
    background-color: #fff;
    border: 1px solid #3455ab;
    border-radius: 4px;
    opacity: 1;
    font: normal normal bold 13px/16px Lato;
    letter-spacing: 0px;
    color: #3455ab;
    cursor: pointer;
  }
`

export const Footer = styled.div`
  margin-top: 39px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  span {
    color: #26304680;
  }

  div {
    width: 190px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    &.ui.toggle.checkbox input:checked ~ .box::before,
    &.ui.toggle.checkbox input:checked ~ label::before {
      background-color: #3455ab !important;
    }

    span {
      color: #000000cc;
    }
  }
`
