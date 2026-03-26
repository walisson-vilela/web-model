import { MwGrid } from '@mw-kit/mw-ui'
import styled from 'styled-components'

export const ImeiColumn = styled(MwGrid.Col)`
  > :nth-child(1) > div > input {
    border-radius: 4px 0px 0px 4px;
    border-right-width: 0;
  }
  > :nth-child(2) {
    border-radius: 0px 4px 4px 0px;
  }
`

export * from '../../styled'
