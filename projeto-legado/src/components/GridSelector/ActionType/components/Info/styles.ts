import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s1};
  width: 360px;

  > div {
    :nth-child(1) {
      ${({ theme }) => theme.useTypography('h2')}
      line-height: 19px;
    }

    :not(:nth-child(1)) {
      ${({ theme }) => theme.useTypography('p')}
      line-height: 17px;
    }
  }
`
