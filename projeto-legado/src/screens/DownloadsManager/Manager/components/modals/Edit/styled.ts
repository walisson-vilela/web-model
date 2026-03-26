import { Button, FormProps, Form as SemanticForm } from 'semantic-ui-react'
import styled, { css } from 'styled-components'

export const LoaderContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.75);
  width: 100%;
  height: 100%;
  z-index: 99;

  .ui.loader:after {
    border-color: #3455ab rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1)
      rgba(0, 0, 0, 0.1) !important;
  }
`

interface LabelProps extends React.HTMLProps<HTMLLabelElement> {
  required?: boolean
  disabled?: boolean
  fluid?: boolean
}

export const Label = styled.label<LabelProps>`
  margin-bottom: 0 !important;

  ${(props) => {
    if (!props.fluid) return

    return css`
      width: 100%;
    `
  }}

  > div:nth-child(1) {
    margin-bottom: 7px;
    font-weight: normal;
    color: #263046;
    font-size: 14px;

    ${(props) => {
      if (!props.required) return

      return css`
        :after {
          content: '*';
          margin-left: 2px;
        }
      `
    }}
  }
`

type FormComponent = React.FunctionComponent<FormProps>
export const Form = styled(SemanticForm as never as FormComponent)`
  &.ui.form {
    max-width: 332px;
    min-height: 232px;
    display: flex;
    flex-direction: column;
    gap: 21px;
  }
`

export const SubmitButton = styled(Button)`
  margin-right: 0;

  &.ui.blue.button:not(.basic),
  &.ui.primary.button,
  &.ui.blue.buttons .button {
    border: 1px solid transparent !important;
  }
`
