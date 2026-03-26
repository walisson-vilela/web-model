import styled from 'styled-components'

import { Warning } from '../../../../components'

export const Container = styled.div`
  padding: ${({ theme }) => theme.spacings.s3} 0;
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const Alert = styled((props) => <Warning {...props} />)`
  width: 837px;
  margin: auto auto 0 auto;
`

export { Section } from '../styles'
