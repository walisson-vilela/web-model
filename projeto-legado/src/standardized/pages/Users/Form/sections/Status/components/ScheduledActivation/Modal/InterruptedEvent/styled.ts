import styled from 'styled-components'

export { NotificationContainer } from '../../../../../../styled'

export const SubTitle = styled.div`
  ${({ theme }) => theme.useTypography('h2', { fontWeight: 'normal' })}
  color: ${({ theme }) => theme.colors.greyishBlue};
  margin-bottom: ${({ theme }) => theme.spacings.s3};
`

export const InputsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s3};
  margin-bottom: ${({ theme }) => theme.spacings.s4};
`

export const ClassificationContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.s3};
  align-items: end;
`

export const Footer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.s3};
  padding: ${({ theme }) => theme.spacings.s3};
  justify-content: end;
  border-top: 1px solid ${({ theme }) => theme.colors.lightGrey};
`
