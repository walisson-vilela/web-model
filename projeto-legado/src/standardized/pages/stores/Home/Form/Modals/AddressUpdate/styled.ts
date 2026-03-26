import styled from 'styled-components'

export const Subtitle = styled.b`
  margin-bottom: ${({ theme }) => theme.spacings.s4};
`

export const Line = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.warningGray};
  margin-bottom: ${({ theme }) => theme.spacings.s3};
`
