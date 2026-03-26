import styled from 'styled-components'

export const PopupContainer = styled.div`
  display: flex;
  width: 446px;
  max-width: 446px;
  height: 270px;
`

const PopupItem = styled.div`
  padding: ${({ theme }) =>
    `${theme.spacings.s3} 0 ${theme.spacings.s3} ${theme.spacings.s3}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightestGrey};
`

export const Header = styled(PopupItem)`
  display: flex;
  gap: ${({ theme }) => theme.spacings.s1};
  align-items: center;

  > div:nth-child(1) {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacings.s1};
    flex: 1;
    overflow: hidden;

    > div {
      display: flex;
      gap: calc(${({ theme }) => theme.spacings.s1} / 2);
      align-items: center;

      ${({ theme }) => theme.useTypography('p')}
      line-height: 17px;
    }

    h2 {
      ${({ theme }) => theme.useTypography('h2')};
      line-height: 19px;
      margin: 0;
    }

    .bold {
      font-weight: bold;
    }
  }

  > :nth-child(2) {
    width: 149px;
  }
`
