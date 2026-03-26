import styled from 'styled-components'

export const Subheader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacings.s3} 0;

  > div:first-child {
    color: ${({ theme }) => theme.colors.greyishBlue};
    font-size: 16px;
    font-weight: normal;
    line-height: 19px;
  }

  > div:last-child {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacings.s3};
  }
`
