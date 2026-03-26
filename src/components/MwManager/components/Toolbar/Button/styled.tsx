import styled from 'styled-components'

import { TransparentButton } from '../../../styled'

export const Button = styled(TransparentButton)`
  ${({ theme }) =>
    theme.useTypography('p', {
      fontWeight: 'bold',
    })}

  text-align: center;
  position: relative;
  z-index: 99;
  color: #999999;

  svg {
    width: 14px;
    height: 14px;
    margin: 0 0 0 5px;
    flex: 0 0 auto;
  }
`
