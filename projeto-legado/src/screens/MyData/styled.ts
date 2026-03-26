import {
  FormProps,
  Form as SemanticForm,
  Input as SemanticInput,
  Table as SemanticTable,
  TableProps,
} from 'semantic-ui-react'
import styled, { css } from 'styled-components'

export { Footer, Section } from '../../standardized/components/form/components'

type FormComponent = React.FunctionComponent<FormProps>
export const Form = styled(SemanticForm as never as FormComponent)`
  display: flex !important;
  flex-direction: column !important;
  overflow: hidden !important;
  position: relative !important;
  .hide-arrows {
    input[type='number'] {
      -moz-appearance: textfield;
    }

    input[type='number']::-webkit-outer-spin-button,
    input[type='number']::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
  input {
    color: #263046 !important;
    border-color: #c8c8c8 !important;
  }
  input:disabled {
    opacity: 1 !important;
  }
  .ui.selection.dropdown {
    color: #263046 !important;
    border-color: #c8c8c8 !important;
  }
  .ui.selection.dropdown.disabled {
    opacity: 0.5 !important;
  }

  .ui.dropdown .menu > .item {
    color: #263046 !important;
  }
  .error.field input {
    border-color: #e23851 !important;
  }

  input:disabled {
    opacity: 1 !important;
  }
  .ui.selection.dropdown {
    color: #263046 !important;
    border-color: #c8c8c8 !important;
  }

  .ui.selection.dropdown.disabled {
    opacity: 0.5 !important;
  }

  .table .error.field .ui.selection.dropdown {
    border-color: #e23851 !important;
  }

  .ui.dropdown .menu > .item {
    color: #263046 !important;
  }
`

export const FormContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 7px;
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

export const FooterContainer = styled.div`
  display: flex;
  justify-content: end;
  padding: 14px 0;

  > button.ui.button {
    margin: 0 14px;
    min-width: 130px;

    :first-child {
      margin-left: 0;
    }
    :last-child {
      margin-right: 0;
    }
  }
`

export const SubSectionAvatar = styled.div`
  padding: 14px 21px;

  :not(:first-child) {
    border-top: 1px solid rgb(226, 226, 227);
  }

  .input-field label {
    color: #263046 !important;
  }

  .input-field input {
    color: #263046 !important;
    border-color: #c8c8c8;
    &:focus {
      border-color: #c8c8c8;
    }
  }
`

export const SubSection = styled.div`
  padding: 21px;

  :not(:first-child) {
    border-top: 1px solid rgb(226, 226, 227);
  }

  .input-field label {
    color: #263046 !important;
  }

  .input-field input {
    color: #263046 !important;
    border-color: #c8c8c8;
    &:focus {
      border-color: #c8c8c8;
    }
  }
`

export const RowSection = styled.div`
  display: flex;

  > div {
    margin-right: 35px;
  }
`

export const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 14px;
  color: #263046;
`

export const SecondTitle = styled(Title)`
  margin-top: 14px;
`

export const ItemBasic = styled.div`
  margin-bottom: 14px;
  color: #263046;
  font-size: 16px;

  > :first-child {
    margin-bottom: 7px;
  }

  span {
    color: #19233880;
    font-weight: bold;
  }

  .lb-text {
    font-weight: bold;
    color: #263046;
  }

  .ui.button.secondary {
    display: flex !important;
    border: 1px solid #3455ab !important;
    color: #3455ab !important;
    background-color: #ffffff !important;
    margin-top: 24px !important;
    align-items: center !important;
    justify-content: center !important;

    padding: 8.5px 21px;
    font-size: 14px !important;
    line-height: 16px;
  }

  .input-field label {
    color: #263046 !important;
  }

  .input-field input {
    color: #263046 !important;
    border-color: #c8c8c8 !important;
    &:focus {
      border-color: #c8c8c8 !important;
    }
  }

  .validation-field {
    color: #000 !important;
    font-weight: normal !important;
  }
`

export const Item = styled.div`
  margin-bottom: 14px;
  color: #263046;

  > :first-child {
    margin-bottom: 7px;
  }

  span {
    color: #19233880;
    font-weight: bold;
  }

  .lb-text {
    font-weight: bold;
    color: #263046;
  }

  .ui.button.secondary {
    display: flex !important;
    border: 1px solid #3455ab !important;
    color: #3455ab !important;
    background-color: #ffffff !important;
    margin-top: 24px !important;
    align-items: center !important;
    justify-content: center !important;

    padding: 8.5px 21px;
    font-size: 14px !important;
    line-height: 16px;
  }

  .input-field label {
    color: #263046 !important;
  }

  .input-field input {
    color: #263046 !important;
    border-color: #c8c8c8 !important;
    &:focus {
      border-color: #c8c8c8 !important;
    }
  }

  .validation-field {
    color: #000 !important;
    font-weight: normal !important;
  }
`

export const ItemFone = styled(Item)`
  width: 250px;
`

export const ItemEmail = styled(Item)`
  width: 300px;
`

export const ItemUser = styled(Item)`
  width: 250px;
`

export const Validation = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 14px;
  margin-bottom: 14px;
`

type TableComponent = React.FunctionComponent<TableProps>
export const Table = styled(SemanticTable as never as TableComponent).attrs(
  (props) => ({
    basic: props.basic || 'very',
  }),
)`
  &.ui.table tr td {
    border: none;
    padding: 0 17.5px;
  }
`

export const PopUpContent = styled.div`
  .popup {
    background-color: #263046 !important;
  }
  h2 {
    font-size: 17px;
    margin: 0;
  }
`

interface LabelProps extends React.HTMLProps<HTMLLabelElement> {
  required?: boolean
  disabled?: boolean
}

export const Label = styled.label<LabelProps>`
  margin-bottom: 0 !important;

  opacity: ${(props) => (props.disabled ? '.5' : '1')};

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

interface ValidationFieldProps {
  character?: boolean
}

export const ValidationField = styled(Item)<ValidationFieldProps>`
  width: 100%;
  max-width: 280px;
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  justify-content: space-between;
  span {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 6px;
    ${(props) =>
      props.character &&
      css`
        width: 206px;
      `}
  }
`

export const Input = styled(SemanticInput)`
  &.ui.input {
    > input:not([type]),
    > input[type='date'],
    > input[type='datetime-local'],
    > input[type='email'],
    > input[type='file'],
    > input[type='number'],
    > input[type='password'],
    > input[type='search'],
    > input[type='tel'],
    > input[type='text'],
    > input[type='time'],
    > input[type='url'] {
      padding: 8px 14px !important;
      line-height: 14px;
      font-size: 14px;
      width: 100% !important;
    }

    &.icon {
      > input:not([type]),
      > input[type='date'],
      > input[type='datetime-local'],
      > input[type='email'],
      > input[type='file'],
      > input[type='number'],
      > input[type='password'],
      > input[type='search'],
      > input[type='tel'],
      > input[type='text'],
      > input[type='time'],
      > input[type='url'] {
        padding-right: 40px !important;
      }

      > svg {
        cursor: pointer;
        position: absolute;
        top: 0;
        right: 7px;
        margin: 0;
        height: 100%;
      }
    }
  }
`

export const RulesContainer = styled.div`
  width: max-content;
  display: flex;
  flex-direction: column;
  gap: 14px;
  :not(:last-child) {
    padding-bottom: 14px;
  }
`

export const Rule = styled.div`
  display: flex;
  align-items: center;

  > span {
    flex: 1;
    font-size: 14px;
    color: #192338;
  }

  > img {
    margin-left: 14px;
  }
`
