import styled from 'styled-components'

export const PopupContainer = styled.div`
  display: flex;
  width: 446px;
  max-width: 446px;
  height: 270px;
`

export const PopupItem = styled.div`
  padding: ${({ theme }) =>
    `${theme.spacings.s3} 0 ${theme.spacings.s3} ${theme.spacings.s3}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightestGrey};
`

export const Header = styled(PopupItem)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s1};

  :has(> :nth-child(2)) {
    padding-bottom: ${({ theme }) => theme.spacings.s1};
  }

  > div {
    display: flex;
    gap: ${({ theme }) => theme.spacings.s1};
    align-items: center;

    > div:nth-child(1) {
      flex: 1;
      overflow: hidden;

      > div {
        display: flex;
        gap: calc(${({ theme }) => theme.spacings.s1} / 2);
        align-items: center;
      }

      h2 {
        ${({ theme }) => theme.useTypography('h2')};
        margin: 0;
      }
      h5 {
        ${({ theme }) => theme.useTypography('h5')};
        margin: 0;
      }

      .bold {
        font-weight: bold;
      }
    }

    > :nth-child(2) {
      width: 149px;
    }
  }
`
