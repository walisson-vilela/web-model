import styled from 'styled-components'

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.darkBlue};
  color: ${({ theme }) => theme.colors.white};
  width: 100%;
  min-height: 55px;
  display: flex;
  align-items: center;

  gap: ${({ theme }) => theme.spacings.s6};
  padding: 0 ${({ theme }) => theme.spacings.s1} 0
    ${({ theme }) => theme.spacings.s3};

  > div {
    :nth-child(1) {
      margin-right: auto;
      > img {
        height: 36px;
      }
    }
  }
`

export default Container
