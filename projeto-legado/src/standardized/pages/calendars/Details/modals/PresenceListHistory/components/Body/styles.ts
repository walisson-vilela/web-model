import styled from 'styled-components'

export const Container = styled.div`
  padding: ${({ theme }) =>
    `${theme.spacings.s3} ${theme.spacings.s4} 0 ${theme.spacings.s4}`};

  > .title {
    display: grid;
    gap: ${({ theme }) => theme.spacings.s1};
    margin-bottom: ${({ theme }) => theme.spacings.s4};
    span {
      ${({ theme }) => theme.useTypography('h5')}
      display: flex;
    }
    .label {
      gap: 4px;
    }
  }
`
