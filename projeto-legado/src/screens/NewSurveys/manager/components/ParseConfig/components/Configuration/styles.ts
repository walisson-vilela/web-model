import { Form } from 'semantic-ui-react'
import styled from 'styled-components'

export const HeaderContainer = styled.div`
  width: 100%;
  height: 64px;
  background-color: #3455ab;
  padding: 21px;

  & > span {
    font: normal normal bold 18px/20px Lato;
    color: #ffffff;
  }
`

export const Container = styled.div`
  width: 100%;
  height: 472px;
  display: flex;
  flex-direction: column;
  padding: 21px;
  gap: 21px;
`

export const DescriptionText = styled.span`
  font: normal normal bold 16px/24px Lato;
  color: #263046cc;
`

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 21px;
  margin-top: 21px;
`

export const NameInput = styled(Form.Field)`
  width: 348px;
  display: flex;
  flex-direction: column;
  margin: 0 !important;

  label > div > span {
    font: normal normal bold 16px/24px Lato;
    color: #263046cc;
  }
`

export const ErrorText = styled.span`
  color: #9f3a38;
`

export const FrequencyInput = styled.div`
  width: 246px;
  display: flex;
  flex-direction: column;
  gap: 7px;

  & > label {
    font: normal normal bold 16px/24px Lato;
    color: #263046cc;
  }
`

export const ToggleInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;

  & > label {
    font: normal normal bold 16px/24px Lato;
    color: #263046cc;
  }
`

export const ToggleInputContainer = styled.div`
  display: flex;
  gap: 7px;

  align-items: center;

  & > span {
    font: normal normal normal 14px/24px Lato;
    color: #263046cc;
  }
`

export const MadeBy = styled.div`
  width: 100%;
  & > strong {
    font: normal normal bold 14px/24px Lato;
    color: #263046cc;

    & > span {
      font: normal normal normal 14px/24px Lato;
      color: #263046cc;
    }
  }
`
