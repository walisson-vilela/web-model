import styled from 'styled-components'

export const Col = styled.div`
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  /* switch */
  :nth-child(1) {
    padding-right: ${({ theme }) => theme.spacings.s3};
    border-right: 1px solid ${({ theme }) => theme.colors.lightestGrey};
  }
  /* event manager */
  :nth-child(2) {
    padding-left: ${({ theme }) => theme.spacings.s3};

    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.spacings.s1};
  }
`
