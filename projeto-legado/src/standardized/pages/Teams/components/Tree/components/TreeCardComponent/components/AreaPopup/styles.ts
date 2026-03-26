import styled from 'styled-components'

import { PopupItem } from '../../../../../PopupHeader/styles'

export const Region = styled(PopupItem)`
  h4 {
    ${({ theme }) => theme.useTypography('h4')};
    margin: 0;
  }

  h5 {
    ${({ theme }) => theme.useTypography('h5')};
    margin: 0;
    color: ${({ theme }) => theme.getColor('greyishBlue', 30)};
  }
`
