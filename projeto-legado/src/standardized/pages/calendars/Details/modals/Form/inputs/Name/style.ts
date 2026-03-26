import styled from 'styled-components'

export const ErrorMessage = styled.div`
  ${({ theme }) => theme.useTypography('h5')};
  color: ${({ theme }) => theme.getColor('pink')};
  padding-top: ${({ theme }) => theme.spacings.s1};

  min-height: 24px;
`
