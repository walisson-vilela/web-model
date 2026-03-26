import { MwEllipsisContainer } from '@mw-kit/mw-ui'
import styled from 'styled-components'

import type { Config } from '../types'

const Container = styled.div`
  ${({ theme }) => theme.useTypography('p')}
  line-height: 17px;
  color: ${({ theme }) => theme.colors.darkBlue};
  > div {
    :nth-child(2) {
      opacity: 0.5;
    }
  }
`

const Row: Config['RowComponent'] = ({ data }) => {
  return (
    <Container>
      <div style={{ display: 'flex', gap: '0.5ch' }}>
        <MwEllipsisContainer>{data.hierarchy.name}</MwEllipsisContainer>
        <span> | </span>
        <MwEllipsisContainer>{data.name || '-'}</MwEllipsisContainer> (
        {data.child_count || 0})
      </div>

      <MwEllipsisContainer>
        {data.user?.name || 'Indefinido'}
      </MwEllipsisContainer>
    </Container>
  )
}

export default Row
