import styled from 'styled-components'

export const FormContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => `${theme.spacings.s4} ${theme.spacings.s1} 0 0`};
`
interface SectionProps {
  borderless?: boolean
}

export const Section = styled.div<SectionProps>`
  border-width: ${(props) => (props.borderless ? 0 : '1px')};
  border-color: #e2e2e3;
  border-style: solid;
  border-radius: 0.28571429rem;
  margin: ${({ theme }) => theme.spacings.s3} 0;
  background-color: #fff;

  :first-child {
    margin-top: 0;
  }
  :last-child {
    margin-bottom: 0;
  }
`
