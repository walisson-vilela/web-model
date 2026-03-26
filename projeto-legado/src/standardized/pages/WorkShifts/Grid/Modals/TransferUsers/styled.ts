import styled from 'styled-components'

export const Subtitle = styled.div`
  ${({ theme }) => theme.useTypography('p')};
  display: flex;
  gap: calc((${({ theme }) => theme.spacings.s1} / 2));
  padding: ${({ theme }) => `0 ${theme.spacings.s4}`};
`
