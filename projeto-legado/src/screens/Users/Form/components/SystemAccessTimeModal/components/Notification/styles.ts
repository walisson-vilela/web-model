import styled from 'styled-components'

export const NotificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s1};

  > div {
    :nth-child(1) {
      font-size: 16px;
      line-height: 19px;
    }

    :nth-child(2) {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.spacings.s3};

      > div {
        position: relative;
        padding-left: ${({ theme }) => theme.spacings.s3};
        :before {
          content: '-';
          position: absolute;
          top: 0;
          left: 0;
        }
      }
    }
  }
`
