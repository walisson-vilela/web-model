import { MwButton } from '@mw-kit/mw-ui'
import styled from 'styled-components'

export const Button = styled(MwButton)`
  display: flex;
  gap: ${({ theme }) => theme.spacings.s1};
  justify-content: center;
  align-items: center;

  :not(:disabled):hover i:before {
    color: ${({ theme }) => theme.colors.blue};
  }
`
