import styled from 'styled-components'

export const Header = styled.div`
  width: 100%;
  height: 64px;
  padding: 21px;
  margin: 0;
  background-color: #3455ab;

  & > strong {
    font: normal normal bold 18px/20px Lato;
    color: #ffffff;
  }
`

export const Content = styled.div`
  width: 100%;
  height: 422px;
  display: flex;
  gap: 14px;
`

export const LoaderContainer = styled.div`
  width: 100%;
  height: 422px;
  position: relative;

  .ui.loader:after {
    border-color: #3455ab rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1)
      rgba(0, 0, 0, 0.1) !important;
  }
`

export const LoaderButtonContainer = styled.div`
  width: 100%;
  height: 422px;
  position: relative;

  .ui.loader:after {
    border-color: #3455ab rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1)
      rgba(0, 0, 0, 0.1) !important;
  }
`

export const ModalHeaderText = styled.strong`
  font: normal normal bold 18px/20px Lato;
  color: #263046;
`

export const ModalDescriptionText = styled.p`
  padding-block: 20px;
  font: normal normal medium 14px/20px Lato;
  color: #263046;
`

export const Buttons = styled.div`
  & > button {
    width: 110px;
  }
`

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 14px;
  justify-content: flex-end;
`

export const PopupContent = styled.div`
  width: 277px;
  height: 63px;
  display: flex;
  align-items: center;
`
