import styled from 'styled-components'

export const PopupContainer = styled.div`
  width: 450px;
  height: 270px;
  display: flex;
  flex-direction: column;
  gap: 7px;
`

export const PopupHeader = styled.div`
  width: 100%;
  display: flex;

  align-items: flex-end;

  padding: ${({ theme }) => `${theme.spacings.s3} ${theme.spacings.s4}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightestGrey};

  > div:nth-child(1) {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacings.s1};
    flex: 1;
    > div {
      color: ${({ theme }) => theme.getColor('black', 80)};
      :nth-child(1) {
        ${({ theme }) => theme.useTypography('h2')};
        line-height: 19px;
      }
      :nth-child(2) {
        ${({ theme }) => theme.useTypography('p')};
        line-height: 17px;
        display: flex;
        gap: calc(${({ theme }) => theme.spacings.s1} / 2);

        > div {
          font-weight: bold;
        }
      }
    }
  }
`

export const Row = styled.div`
  ${({ theme }) => theme.useTypography('p')}
  line-height:17px;
  color: ${({ theme }) => theme.colors.greyishBlue};
  display: flex;
  flex-direction: column;
  gap: calc(${({ theme }) => theme.spacings.s1} / 2);
  padding: ${({ theme }) => theme.spacings.s3};
  > div:nth-child(2) {
    opacity: 0.5;
  }
  :not(:first-child) {
    border-top: 1px solid ${({ theme }) => theme.colors.lightestGrey};
  }
`
