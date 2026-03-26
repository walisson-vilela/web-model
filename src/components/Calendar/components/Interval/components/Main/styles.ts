import styled from 'styled-components'

export * from '../../../../styles'

export const CalendarsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.s3};
  background-color: ${({ theme }) => theme.colors.white};
`

export const LabelContainer = styled.div`
  color: ${({ theme }) => theme.colors.darkestGrey};
  > b {
    color: ${({ theme }) => theme.colors.darkBlue};
  }
`
