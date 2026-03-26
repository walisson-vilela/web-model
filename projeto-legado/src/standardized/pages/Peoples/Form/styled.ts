import styled from 'styled-components'

export { Section } from '../../../components/form/components'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`

export const FormContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 14px 7px 0 0;
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

export const SubSection = styled.div`
  padding: 21px 14px;

  :not(:first-child) {
    border-top: 1px solid rgb(226, 226, 227);
  }
`

interface TitleProps {
  marginBottom?: string
}

export const Title = styled.div<TitleProps>`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: ${(props) => props.marginBottom || '14px'};
  color: #263046;
`
