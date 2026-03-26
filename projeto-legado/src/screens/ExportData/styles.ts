import {
  PopupProps as SemanticPopUpProps,
  Popup as SemanticPopup,
} from 'semantic-ui-react'
import styled, { css } from 'styled-components'

interface PopUpProps extends SemanticPopUpProps {
  noMessage: boolean
}

export const PopUp = styled(SemanticPopup)<PopUpProps>``

export const SubSection = styled.div`
  width: 100%;
  margin: 8px 0;
  padding: 21px;
  border: 1px solid rgb(226, 226, 227);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 21px 0 21px 0;
`

export const LeftContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  > p {
    font-size: 14px;
    line-height: 17px;
    margin-bottom: 0;
  }
  gap: 7px;
`

export const RightContent = styled.div`
  width: 100%;
  flex: 1;
  border-left: 1px solid rgb(226, 226, 227);
  height: 100%;
  padding-left: 28px;
  padding-right: 7px;
  > p {
    font-size: 14px;
    line-height: 17px;
    margin-bottom: 0;
  }
`

interface TitleProps {
  marginBottom?: string
}
export const Title = styled.h2<TitleProps>`
  font: normal normal bold 18px/22px Lato;
  letter-spacing: 0px;
  color: #192338;
  margin-bottom: 7px;
`

export const Text = styled.span`
  font: normal normal normal 14px/17px Lato;
  letter-spacing: 0px;
  color: #192338;
`

export const ParametersText = styled.span`
  font: normal normal bold 14px/17px Lato;
  letter-spacing: 0px;
  color: #192338;
`

export const ConfigurationText = styled.span`
  font: normal normal normal 13px/16px Lato;
  letter-spacing: 0px;
  color: #192338;
  opacity: 0.5;
`

export const Divider = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  margin-top: 14px;

  div {
    width: 100%;

    & > div {
      width: auto;
      height: 115px;

      & > div {
        height: auto;
      }
    }
  }
  .ui.button {
    width: 114px;
    height: 33px;
    margin-right: 0 !important;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer !important;
  }
  .ui.primary.button:disabled {
    cursor: pointer !important;
  }
`

export const EmailInputsContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-right: 21px;
`

export const ButtonContainer = styled.section``

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  width: 232px;
  margin-top: 7px;
  gap: 7px;

  & > button {
    margin-left: 0 !important;
  }

  .ui.selection.dropdown > .dropdown.icon {
    color: #c8c8c8;
  }
  .ui.selection.active.dropdown,
  .ui.selection.active.dropdown .menu {
    border-color: #c8c8c8 !important;
  }

  label {
    margin-bottom: 3.5px;
  }
`

interface ContentProps {
  visible?: 1 | 0
}

export const Content = styled.div<ContentProps>`
  margin-top: 7px;
  ${({ visible }) => {
    if (visible) return
    return css`
      visibility: hidden;
    `
  }}

  p {
    margin-bottom: 3.5px;
  }
`

export const Parameters = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 7px;
  .ui.button {
    width: 93px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export const ModalDescription = styled.span`
  color: #263046;
`

export const ModalText = styled.p`
  color: #192338;
  margin-top: 4px;
`
