import styled from 'styled-components'

export const Container = styled.div`
  ${({ theme }) => theme.useTypography('p')}

  font-size: 14px;
  padding: ${({
    theme: {
      spacings: { s1 },
    },
  }) => `0 0 ${s1} ${s1}`};

  display: flex;
  flex-direction: column;
  gap: ${({
    theme: {
      spacings: { s3 },
    },
  }) => s3};

  > div:nth-child(1) {
    ${({ theme: { useTypography } }) => useTypography('p')}
    font-size: 14px;
    color: ${({ theme: { getColor } }) => getColor('greyishBlue', 50)};
  }
`
