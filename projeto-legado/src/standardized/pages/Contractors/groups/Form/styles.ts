import { MwForm } from '@mw-kit/mw-ui'
import styled from 'styled-components'

import SemanticCheckbox from '../../../../../components/ControlledInputs/Checkbox'

export {
  EmptyMessage,
  Link,
  Subtitle as Description,
  Title,
} from '../../styles'

export const Form = styled(MwForm)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`

export const FormContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 28px 7px 0 0;
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

interface SectionProps {
  borderless?: boolean
}

export const Section = styled.div<SectionProps>`
  border-width: ${(props) => (props.borderless ? 0 : '1px')};
  border-color: rgb(226, 226, 227);
  border-style: solid;
  border-radius: 0.28571429rem;
  margin: 1rem 0;
  background-color: #fff;

  :first-child {
    margin-top: 0;
  }
  :last-child {
    margin-bottom: 0;
  }
`

export const SubSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 21px;
  padding: 21px 14px;

  :not(:first-child) {
    border-top: 1px solid rgb(226, 226, 227);
  }
`

export const Checkbox = styled(SemanticCheckbox)`
  &.ui.toggle.checkbox input:checked ~ .box::before,
  &.ui.toggle.checkbox input:checked ~ label::before {
    background-color: #3455ab !important;
  }
`

export const ButtonContainer = styled.div`
  margin-bottom: 14px;
`
