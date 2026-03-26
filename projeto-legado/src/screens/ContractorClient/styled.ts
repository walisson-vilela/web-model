import {
  Form as SemanticForm, FormProps, Table as SemanticTable,
  TableProps
} from 'semantic-ui-react'
import styled, { css } from 'styled-components'

export { Footer } from '../../standardized/components/form/components'

type FormComponent = React.FunctionComponent<FormProps>
export const Form = styled(SemanticForm as never as FormComponent)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`

export const FormContainer = styled.div`
  flex: 1;
  overflow-y: auto;
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



export const Section = styled.div`
  background-color: #fff;
  border: 1px solid rgb(226, 226, 227);
  border-radius: 0.28571429rem;
  margin: 1rem 0;

  :first-child {
    margin-top: 0;
  }
  :last-child {
    margin-bottom: 0;
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

export const Title = styled.div`
  font-size: 18px;
  line-height: 22px;
  font-weight: bold;
  margin-bottom: 14px;
`

export const Item = styled.div`
  margin-bottom: 14px;

  > :first-child {
    margin-bottom: 7px;
  }

  input#phone_adm_master:disabled {
    opacity: 1;
  }

  .lb-text {
    font-weight: bold;
    color: #263046;
  }
`

export const Item2 = styled.div`
  padding: 14px;
  background-color: #fffaf3;
  border: 1px solid #dbd0b9;
  border-radius: 4px;

  input#phone_adm_master:disabled {
    opacity: 1;
  }

  .lb-text {
    font-weight: bold;
    color: #263046;
  }
`

export const ContractTitle = styled.p`
  margin: 0;
  text-align: center;
  font-weight: bold;
`

interface ContractItemsProps {
  withLink?: boolean
  withTitle?: boolean
}

export const ContractItems = styled.div<ContractItemsProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    text-align: center;
    flex: 1;

    ${({ withLink }) =>
      withLink &&
      css`
        &:first-child:hover {
          text-decoration: underline;
          cursor: pointer;
        }
      `}

    ${({ withTitle }) =>
      withTitle &&
      css`
        &:first-child {
          text-align: left;
        }
      `}
  }
`

type TableComponent = React.FunctionComponent<
  TableProps & { $withBorder?: true }
>
export const Table = styled(SemanticTable as never as TableComponent).attrs(
  (props) => ({
    basic: props.basic || 'very',
  }),
)`
  &.ui.table tr td {
    border: none;
    padding: 0 7px;

    ${(props) =>
      props.$withBorder &&
      css`
        &:not(:last-child) {
          border-right: 1px solid #e2e2e3;
        }
      `}
  }
`
