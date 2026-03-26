import { MwGrid } from '@mw-kit/mw-ui'
import styled from 'styled-components'

export const Container = styled.div`
  padding: ${({
    theme: {
      spacings: { s4 },
    },
  }) => `${s4} ${s4} 0 ${s4}`};

  > {
    :nth-child(1) {
      ${({ theme }) => theme.useTypography('h3')};
      line-height: 19px;
      margin-bottom: ${({ theme }) => theme.spacings.s1};
    }
  }
`

export const Col = styled(MwGrid.Col)`
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s3};

  > {
    :nth-child(2) {
      height: 280px;
    }

    :nth-child(3) {
      display: flex;
      justify-content: end;
    }
  }
`
