import styled from 'styled-components'

export const Container = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 262px;
`

export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  strong {
    text-align: left;
    font: normal normal bold 14px/24px Lato;
    letter-spacing: 0px;
    color: #000000;
    opacity: 1;
    display: block;
  }
`

export const Content = styled.div`
  width: 100%;
  margin-top: 14px;
  span {
    text-align: left;
    font: normal normal normal 14px/17px Lato;
    letter-spacing: 0px;
    color: #192338;
    opacity: 1;
  }

  textarea {
    margin-top: 14px;
    width: 100%;
    height: 164px;
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #c8c8c8;
    resize: none;
    opacity: 1;
    padding: 7px !important;
    overflow-y: auto;
  }
`

export const Footer = styled.div`
  width: 114%;
  border-top: 1px solid #dadadb;
  margin-top: 14px;
  padding-top: 14px;
  padding-inline: 14px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export const Button = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;
  cursor: pointer;

  & > strong {
    font: normal normal bold 14px/15px Lato;
    letter-spacing: 0px;
    color: #192338;
  }
`
