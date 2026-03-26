import { MwEllipsisContainer } from '@mw-kit/mw-ui'
import styled from 'styled-components'

export const Title = styled(MwEllipsisContainer)`
  ${({ theme }) => theme.useTypography('p')}
  line-height: 17px;
  margin: 0;
`

export const Subtitle = styled(MwEllipsisContainer)`
  ${({ theme }) => theme.useTypography('h6')}
  line-height: 16px;

  margin-top: 1.75px;
  opacity: 50%;
`

export const Container = styled.div`
  display: flex;
  gap: calc(${({ theme }) => theme.spacings.s1} / 2);
  flex-direction: column;

  ${Subtitle} {
    margin-top: 0;
  }
`
