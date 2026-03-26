import styled from 'styled-components'

import { ContainerProps } from './types'

export const Container = styled.div<ContainerProps>`
  color: ${({ theme }) => theme.getColor('greyishBlue', 50)};
  font-size: 14px;
  padding: 0
    ${({ theme, padding }) => (padding === '0' ? 0 : theme.spacings.s4)};
  display: flex;
  flex-direction: column;
  gap: calc(${({ theme }) => theme.spacings.s1} / 2);

  ${({ theme }) => theme.useTypography('p')}
`
