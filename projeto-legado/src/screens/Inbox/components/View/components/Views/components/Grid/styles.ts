import { MwAbsoluteContainer } from '@mw-kit/mw-ui'
import styled from 'styled-components'

export const AbsoluteContainer = styled(MwAbsoluteContainer)`
  overflow: hidden;

  > div {
    display: flex;
    flex-direction: column;
    padding: ${({
      theme: {
        spacings: { s3 },
      },
    }) => `${s3} 0 ${s3} ${s3}`};
    width: 100%;

    > div {
      :nth-child(1) {
        display: flex;
        justify-content: space-between;
        gap: calc(${({ theme }) => theme.spacings.s1} / 2);
        padding-right: calc(
          ${({
            theme: {
              spacings: { s1, s3 },
            },
          }) => `${s3} + ${s1} / 2`}
        );
        font-weight: bolder;
        font-size: 18px;
        line-height: 24px;
        margin-bottom: ${({ theme }) => theme.spacings.s3};
      }

      :nth-child(2) {
        > div > div {
          display: flex;
          flex-direction: column;
          gap: ${({ theme }) => theme.spacings.s3};
          > div {
            display: flex;
            flex-direction: column;
            gap: ${({ theme }) => theme.spacings.s3};
          }
        }
      }
    }
  }
`

export const Title = styled.div`
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
`

export const Item = styled.div`
  display: flex;
  gap: 18px;
  align-items: center;
  font-size: 14px;
  line-height: 17px;

  > div {
    :nth-child(1) {
      width: 45%;
    }
    :nth-child(2) {
      width: 55%;
      display: flex;
      gap: ${({ theme }) => theme.spacings.s1};
      overflow: hidden;
    }
  }
`

export const Delimiter = styled.div`
  width: 100%;
  min-height: 1px;
  background-color: ${({ theme }) => theme.colors.lightestGrey};
`
