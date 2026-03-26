import styled from 'styled-components'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: ${({ theme }) => theme.spacings.s3};
  flex: 1;
  max-width: 100%;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: ${({ theme }) =>
      `${theme.spacings.s3} ${theme.spacings.s3} 0 ${theme.spacings.s3}`};
    gap: ${({ theme }) => theme.spacings.s3};

    > div {
      display: flex;
      width: 100%;
      align-items: center;
    }

    > div:nth-child(1) {
      justify-content: space-around;
    }
  }
`

export const Title = styled.div`
  ${({ theme }) => theme.useTypography('p')}
  text-align: center;
`

export const TypeSection = styled.div`
  display: flex;
  justify-content: space-around;
`
