import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 199px;
  margin: 0;
  padding: 0;
`

export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 14px;

  svg {
    cursor: pointer;
  }

  strong {
    text-align: left;
    font: normal normal normal 14px/17px Lato;
    letter-spacing: 0px;
    color: #192338;
    opacity: 1;
    margin-left: 8px;
    display: block;
  }
`

export const Content = styled.div`
  width: 100%;
  padding: 7px 14px 0 14px;
  p {
    text-align: left;
    font: normal normal normal 14px/17px Lato;
    letter-spacing: 0px;
    color: #b0b0b0;
    opacity: 1;
  }

  & div {
    padding-bottom: 7px;
  }
  textarea {
    width: 100%;
    height: 82px;
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #c8c8c8;
    resize: none;
    opacity: 1;
    padding: 7px !important;
    overflow-y: auto;
  }
`
