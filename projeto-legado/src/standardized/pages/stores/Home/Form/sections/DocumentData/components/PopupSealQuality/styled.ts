import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s1};
  padding: ${({ theme }) => theme.spacings.s3};

  ${({ theme }) => theme.useTypography('p')}
  line-height: 17px;

  > div {
    display: flex;
    flex-direction: column;
    gap: calc(${({ theme }) => theme.spacings.s1} / 2);
  }
`
