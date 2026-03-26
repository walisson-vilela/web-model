import { MwGrid } from '@mw-kit/mw-ui'
import styled from 'styled-components'

export const Container = styled.div`
  padding: ${({
    theme: {
      spacings: { s4 },
    },
  }) => `0 ${s4}`};
`

export const Col = styled(MwGrid.Col)`
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s1};
  overflow: hidden;

  > {
    :nth-child(2) {
      height: 280px;
      width: 100%;
    }

    :nth-child(3) {
      display: flex;
      justify-content: space-between;
      gap: ${({ theme }) => theme.spacings.s1};
      > div:nth-child(1) {
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.spacings.s1};
      }
    }
  }
`
