import styled from 'styled-components'

export const Accordion = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s1};
  padding-bottom: ${({ theme }) => theme.spacings.s1};

  > div:nth-child(1) {
    display: flex;
    gap: ${({ theme }) => theme.spacings.s3};
    color: ${({ theme }) => theme.colors.blue};
    ${({ theme }) => theme.useTypography('p')}
    line-height: 17px;
    > div:nth-child(1) {
      background-color: ${({ theme }) => theme.colors.white};
    }
  }
`

export const CardsContainer = styled.div`
  padding-left: 31px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s3};
`
