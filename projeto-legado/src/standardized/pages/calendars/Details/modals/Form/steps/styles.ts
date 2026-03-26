import styled from 'styled-components'

export const Section = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  padding: ${({
    theme: {
      spacings: { s3, s4 },
    },
  }) => `${s3} ${s3} ${s4} ${s3}`};
  display: flex;
  gap: ${({ theme }) => theme.spacings.s6};
`

export const TabsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  > div:nth-child(1) {
    margin: auto 0;
  }
`
