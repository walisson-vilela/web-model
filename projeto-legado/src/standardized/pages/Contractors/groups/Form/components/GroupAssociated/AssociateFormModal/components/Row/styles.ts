import { MwEllipsisContainer } from '@mw-kit/mw-ui'
import styled from 'styled-components'

export const Title = styled(MwEllipsisContainer)`
  ${({ theme }) => theme.useTypography('p')}
  color: ${({ theme }) => theme.colors.darkBlue};
`
export const Description = styled(MwEllipsisContainer)`
  ${({ theme }) => theme.useTypography('p')}
  color: ${({ theme }) => theme.colors.darkGrey};
`
