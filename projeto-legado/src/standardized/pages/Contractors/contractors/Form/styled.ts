import { MwForm } from '@mw-kit/mw-ui'
import { Table as SemanticTable, TableProps } from 'semantic-ui-react'
import styled, { css } from 'styled-components'

import SemanticCheckbox from '../../../../../components/ControlledInputs/Checkbox'

export { Footer } from '../../../../../standardized/components/form/components'
export { Section } from '../../../../components/form/components'
export { EmptyMessage, Link, Subtitle, Title } from '../../styles'

export const Form = styled(MwForm)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`

export const FormContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 28px 7px 0 0;`

export const SubSection = styled.div`
  padding: 21px 14px;

  :not(:first-child) {
    border-top: 1px solid rgb(226, 226, 227);
  }

  & > .ui.table thead th {
    cursor: auto;
    background: #f9fafb;
    text-align: inherit;
    color: rgba(0, 0, 0, 0.87);
    padding: 0.92857143em 0.78571429em;
    vertical-align: inherit;
    font-style: none;
    font-weight: 700;
    text-transform: none;
    border-bottom: 1px solid rgba(34, 36, 38, 0.1);
    border-left: none;
    & > div {
      overflow: hidden;
      font-weight: normal;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      background-color: #f9fafb;
      color: #263046;
    }
  }
`

interface LabelProps extends React.HTMLProps<HTMLLabelElement> {
  required?: boolean
  disabled?: boolean
  fluid?: boolean
}

export const LabelContainer = styled.div`
  display: flex;
  gap: 4px;
`

export const Label = styled.label<LabelProps>`
  margin-bottom: 0 !important;

  ${(props) => {
    if (!props.fluid) return

    return css`
      width: 100%;
    `
  }}

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

export const InfoMessage = styled.span`
  color: #fff;
`

export const Checkbox = styled(SemanticCheckbox)`
  &.ui.toggle.checkbox input:checked ~ .box::before,
  &.ui.toggle.checkbox input:checked ~ label::before {
    background-color: #3455ab !important;
  }
`

export const ItemOperation = styled.div`
  width: 150px;
  display: flex;
  align-items: flex-end;
  gap: 7px;

  > div.field {
    margin-bottom: 0 !important;
    flex: 1;
  }

  .icon::before {
    color: #939393;
  }
`

type TableComponent = React.FunctionComponent<TableProps>
export const Table = styled(SemanticTable as never as TableComponent).attrs(
  (props) => ({
    basic: props.basic === undefined ? 'very' : props.basic,
  }),
)`
  &.ui.table {
    margin: 0;
    :not(:last-child) {
      margin-bottom: 14px;
    }

    tr {
      :not(:last-child) {
        td {
          padding-bottom: 14px;
        }
      }

      td {
        border: none;
        padding: 0 17.5px;
      }
    }
  }
`

export const LincensesErrorContainer = styled.div`
  font-size: 14px !important;
  line-height: 17px !important;
  display: flex;
  flex-direction: column;
  gap: 7px;
`
