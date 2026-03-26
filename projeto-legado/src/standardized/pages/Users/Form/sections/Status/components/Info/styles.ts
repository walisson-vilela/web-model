import { MwGrid } from '@mw-kit/mw-ui'
import styled from 'styled-components'

export const Col = styled(MwGrid.Col)`
  display: flex;
  gap: calc(${({ theme }) => theme.spacings.s1} / 2);

  ${({ theme }) => theme.useTypography('p')};
  line-height: 17px;
`
