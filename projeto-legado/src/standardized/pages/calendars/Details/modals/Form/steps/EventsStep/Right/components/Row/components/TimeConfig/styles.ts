import styled from 'styled-components'

export const Container = styled.div`
  padding: ${({ theme }) => theme.spacings.s3};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s3};
  width: 567px;

  > div {
    :nth-child(1) {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.spacings.s1};
      > div {
        :nth-child(1) {
          ${({ theme }) => theme.useTypography('h2')};
          line-height: 24px;
          color: ${({ theme }) => theme.getColor('black', 80)};
        }
        :nth-child(2) {
          ${({ theme }) => theme.useTypography('h5')};
          line-height: 17px;
          color: ${({ theme }) => theme.getColor('black', 80)};
        }
      }
    }
    :nth-child(2) {
      max-height: 161px;
      min-height: 161px;
      height: 161px;
      border: 1px solid ${({ theme }) => theme.colors.lightGrey};

      > div:nth-child(1) {
        padding-right: calc(${({ theme }) => theme.spacings.s1} * 1.5);
        border-bottom: 1px solid ${({ theme }) => theme.colors.lightGrey};
      }
    }
    :nth-child(3) {
      display: flex;
      gap: ${({ theme }) => theme.spacings.s1};
      justify-content: end;
    }
  }
`
