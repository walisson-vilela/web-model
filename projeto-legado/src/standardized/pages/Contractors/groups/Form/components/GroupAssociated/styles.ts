import { MwGrid } from '@mw-kit/mw-ui'
import styled, { css } from 'styled-components'

type MwGridProps = Parameters<typeof MwGrid>[0]
type GridProps = { $invalid?: boolean } & MwGridProps
export const Grid = styled(MwGrid)<GridProps>`
  ${({ theme, $invalid: invalid }) => {
    return (
      invalid &&
      css`
        > div > div {
          color: ${theme.colors.warningRed};
        }
      `
    )
  }}
`

export * from '../../styles'
