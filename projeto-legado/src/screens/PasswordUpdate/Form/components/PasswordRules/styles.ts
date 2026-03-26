import styled from 'styled-components'

export * from '../../styles'

export const RulesContainer = styled.div`
  display: flex;
  > div {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacings.s3};

    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: ${({ theme }) => theme.spacings.s3};

      > img {
        width: 17px;
        height: 17px;
      }
    }
  }
`
