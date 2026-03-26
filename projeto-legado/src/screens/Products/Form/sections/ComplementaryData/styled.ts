import { ReactNode } from 'react'

import styled, { css } from 'styled-components'

export const Icon = styled.div<{ children: ReactNode }>`
  ${({ theme: { useTypography } }) => {
    return css`
      ${useTypography('p')}
    `
  }}
  color:${({ theme }) => theme.colors.grey};
`
