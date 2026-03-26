import styled from 'styled-components'

const Section = styled.div<{ $invalid?: boolean }>`
  background-color: white;
  border-width: 1px;
  border-color: ${({ theme, $invalid: invalid }) =>
    invalid ? theme.colors.warningRed : 'rgb(226, 226, 227)'};
  border-style: solid;
  border-radius: 0.28571429rem;
  margin: 1rem 0;

  > div:not(:first-child) {
    border-top: 1px solid ${({ theme }) => theme.colors.lightestGrey};
  }
`

export default Section
