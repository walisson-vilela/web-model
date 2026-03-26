import styled from 'styled-components'

const Header = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.s3};
  justify-content: space-between;
  align-items: center;

  padding: ${({ theme }) => `${theme.spacings.s3} ${theme.spacings.s4}`};

  border-bottom: 1px solid ${({ theme }) => theme.colors.lightestGrey};

  > div {
    :nth-child(1) {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.spacings.s1};

      > div {
        :nth-child(1) {
          ${({ theme }) => theme.useTypography('h2')}
          line-height: 19px;
        }

        :nth-child(2) {
          ${({ theme }) => theme.useTypography('p')}
          line-height: 17px;
        }
      }
    }
  }
`

export default Header
