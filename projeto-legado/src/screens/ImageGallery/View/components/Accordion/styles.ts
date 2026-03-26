import styled from 'styled-components'

export const Content = styled.div`
  .accordion {
    .content {
      padding: 0 !important;
    }
  }
`

export const Header = styled.header`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  width: fit-content !important;

  strong {
    font: normal normal bold 18px/22px Lato;
    letter-spacing: 0px;
    color: #192338;
    opacity: 1;
    margin-left: 7px;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  span {
    font: normal normal bold 18px/22px Lato;
    letter-spacing: 0px;
    color: #192338;
    opacity: 0.5;
    display: inline-block;
    margin-left: 4px;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
`

export const Container = styled.div`
  & > div {
    padding: 0;
  }
`
