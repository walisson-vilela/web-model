import styled from 'styled-components'

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > p {
    text-align: left;
    font: normal normal normal 14px/24px Lato;
    letter-spacing: 0px;
    color: #000000cc;
    opacity: 1;
  }
`

export const CreateBySearchContainer = styled.div`
  & > a {
    text-align: left;
    text-decoration: none;
    font: normal normal normal 14px/24px Lato;
    letter-spacing: 0px;
    color: #000000cc;
    opacity: 1;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`

export const LoaderContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.75);
  width: 100%;
  height: 100%;
  z-index: 99;
`
