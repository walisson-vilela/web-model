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
      <MwEllipsisContainer>{data.name}</MwEllipsisContainer>
      <MwEllipsisContainer style={{ display: 'flex', gap: '0.5ch' }}>
        Matrícula:{' '}
        <MwEllipsisContainer>{data.person.registration}</MwEllipsisContainer>
        <span> | </span>
        Função: <MwEllipsisContainer>{data.role.name}</MwEllipsisContainer>
      </MwEllipsisContainer>
    </Container>
  )
}

export default Row
