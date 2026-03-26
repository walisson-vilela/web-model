import styled from 'styled-components'

export const FooterConainer = styled.div`
  display: flex;
  justify-content: space-between;

  padding: ${({ theme }) => theme.spacings.s3};

  > :first-child {
    color: ${({ theme }) => theme.colors.warningRed};
  }

  > :last-child {
    display: flex;
    text-align: center;
    gap: 14px;
  }
`
