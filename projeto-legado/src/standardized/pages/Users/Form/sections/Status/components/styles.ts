import { MwGrid } from '@mw-kit/mw-ui'
import styled, { css } from 'styled-components'

export const Col = styled(MwGrid.Col)<{ $isBlue?: boolean }>`
  color: ${({ theme, $isBlue }) =>
    $isBlue ? theme.colors.blue : theme.colors.pink};
  ${({ theme }) => theme.useTypography('p')};
  line-height: 17px;

  > div:nth-child(1) {
    flex: 1;

    text-align: center;
  }
`

export const Link = styled.div<{ $isBlue?: boolean }>`
  color: ${({ theme, $isBlue }) =>
    $isBlue ? theme.colors.blue : theme.colors.pink};

  ${({ onClick }) =>
    onClick &&
    css`
      cursor: pointer;
      :hover {
        text-decoration: underline;
      }
    `}
`
