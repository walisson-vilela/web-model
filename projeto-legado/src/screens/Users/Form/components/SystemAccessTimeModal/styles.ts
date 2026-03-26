import { MwGrid } from '@mw-kit/mw-ui'
import styled from 'styled-components'

export const Container = styled.div`
  padding: ${({
    theme: {
      spacings: { s3, s4 },
    },
  }) => `${s4} ${s4} ${s3} ${s4}`};

  > {
    :nth-child(1) > :last-child {
      cursor: pointer;
    }

    :nth-child(1),
    :nth-child(4) {
      font-size: 18px;
      line-height: 22px;
      font-weight: bold;
      margin-bottom: ${({ theme }) => theme.spacings.s1};

      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.spacings.s1};
    }

    :nth-child(2) {
      margin-bottom: ${({ theme }) => theme.spacings.s4};

      display: flex;
      gap: ${({ theme }) => theme.spacings.s6};
    }

    :nth-child(3) {
      margin-bottom: 9px;
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

export { Header as ModalHeader } from '../../../../../components/MwModal/components'
