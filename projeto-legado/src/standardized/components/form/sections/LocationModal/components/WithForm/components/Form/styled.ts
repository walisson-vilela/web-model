import { MwGrid } from '@mw-kit/mw-ui'
import styled from 'styled-components'

export const RowInputs = styled(MwGrid.Row)`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.iceWhite};
`
export const ColInputs = styled(MwGrid.Col)`
  background-color: ${({ theme }) => theme.colors.iceWhite};
`
