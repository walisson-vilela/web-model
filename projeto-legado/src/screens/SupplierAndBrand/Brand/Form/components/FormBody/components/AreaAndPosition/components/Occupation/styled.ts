import { MwGrid } from '@mw-kit/mw-ui'
import styled from 'styled-components'

export * from '../../styled'

export const Grid = styled(MwGrid)<{ $isInvalid: boolean }>`
  border-radius: 4px;

  ${({ $isInvalid, theme }) =>
    $isInvalid ? `border-color: ${theme.colors.red};` : ''}
`
