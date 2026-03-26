import { MwEllipsisContainer } from '@mw-kit/mw-ui'
import styled from 'styled-components'

export const RowTitle = styled(MwEllipsisContainer)`
  ${({ theme }) => theme.useTypography('h3', { fontWeight: '300' })}
`

export const RowBody = styled(MwEllipsisContainer)`
  ${({ theme }) => theme.useTypography('p', { fontWeight: '100' })}
`
