import React from 'react'

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
      <MwEllipsisContainer>
        {`${data.name} ${data.short_name ? `(${data.short_name})` : ''}`}
      </MwEllipsisContainer>
      <MwEllipsisContainer>{data.country.name}</MwEllipsisContainer>
    </Container>
  )
}

export default Row
