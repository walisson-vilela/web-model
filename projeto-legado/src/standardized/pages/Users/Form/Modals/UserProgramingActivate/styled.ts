import styled from 'styled-components'

export { NotificationContainer } from '../../styled'

export const SubTitle = styled.div`
  ${({ theme }) => theme.useTypography('p')};
`

export const RowInputs = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.s6};
  white-space: nowrap;
`
