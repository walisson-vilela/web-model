import styled from 'styled-components'

export const CardContentItemWrapper = styled.div`
  padding: ${({ theme }) =>
    `${theme.spacings.s3} 0 ${theme.spacings.s3} ${theme.spacings.s4}`};

  border-bottom: 1px solid ${({ theme }) => theme.getColor('lightGrey')};

  display: flex;
  flex-direction: column;
  gap: calc(${({ theme }) => theme.spacings.s1} / 2);

  > div,
  span {
    display: flex;
    gap: calc(${({ theme }) => theme.spacings.s1} / 2);
    ${({ theme }) => theme.useTypography('p')}
    line-height: 17px;
    color: ${({ theme }) => theme.colors.greyishBlue};
  }
  span {
    text-transform: capitalize;
  }

  .info {
    opacity: 0.5;
  }
`
