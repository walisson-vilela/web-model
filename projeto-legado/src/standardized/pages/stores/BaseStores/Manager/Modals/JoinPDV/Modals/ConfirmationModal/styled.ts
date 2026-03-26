import styled from 'styled-components'

export const Label = styled.div`
  ${({ theme }) => theme.useTypography('p')};
  line-height: 17px;
  color: ${({ theme }) => theme.getColor('greyishBlue', 70)};
`
