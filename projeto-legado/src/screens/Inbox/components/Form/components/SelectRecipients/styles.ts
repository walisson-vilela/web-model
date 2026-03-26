import { MwGrid } from '@mw-kit/mw-ui'
import styled from 'styled-components'

export const ModalContent = styled.div`
  height: 390px;
`

export const Col = styled(MwGrid.Col)`
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s3};

  > {
    :nth-child(1) {
      height: 250px;
    }

    :nth-child(2) {
      display: flex;
      justify-content: end;
    }
  }
`

export const Title = styled.p`
  font: normal normal 900 14px/24px Lato;
  letter-spacing: 0px;
  color: #000000cc;
`

export const GridRowStyled = styled.div<{ itemSpacing: number }>`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: ${({ itemSpacing }) => `${itemSpacing}px`};
  height: calc(100% - 125px);

  & > :nth-child(1) {
    display: flex;
    border-right: 1px solid ${({ theme }) => theme.colors.lightestGrey};
  }
`

export const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacings.s1};

  i {
    margin: 0 !important;
  }
`

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  & > span {
    font-size: 14px;
    color: #192338;
  }

  & > small {
    font-size: 12px;
    color: #8a8f99;
  }
`
