import styled from 'styled-components'

export { Link } from '../../../../../../../../styles'

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacings.s1};
`

export const ContentContainer = styled.div`
  width: 305px;

  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s1};

  > div {
    :nth-child(1) {
      padding: ${({
        theme: {
          spacings: { s3 },
        },
      }) => `${s3} ${s3} 0 ${s3}`};

      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.spacings.s1};

      > div:nth-child(1) {
        ${({ theme }) => theme.useTypography('h4')};
        line-height: 17px;
      }
    }
    :nth-child(2) {
      max-height: 149px;
      min-height: 149px;
      height: 149px;
      padding-left: ${({ theme }) => theme.spacings.s3};
      position: relative;
      border-bottom: 1px solid
        ${({ theme }) => theme.getColor('greyishBlue', 10)};
    }
    :nth-child(3) {
      padding: ${({ theme }) =>
        `${theme.spacings.s1} ${theme.spacings.s3} ${theme.spacings.s3} ${theme.spacings.s3}`};

      display: flex;
      justify-content: center;
    }
  }
`

export const RowContainer = styled.div`
  padding: ${({ theme }) => theme.spacings.s3} 0;
  border-bottom: 1px solid ${({ theme }) => theme.getColor('greyishBlue', 10)};

  label {
    position: relative;
  }

  &:last-child {
    border-bottom: none;
  }
`

export const NotificationContainer = styled.div`
  padding: ${({ theme }) => theme.spacings.s3};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s3};
  ${({ theme }) => theme.useTypography('p')};
  line-height: 17px;

  > ul {
    margin: 0;
    padding-left: ${({ theme }) => theme.spacings.s3};
    gap: ${({ theme }) => theme.spacings.s3};
    display: flex;
    flex-direction: column;
  }
`
