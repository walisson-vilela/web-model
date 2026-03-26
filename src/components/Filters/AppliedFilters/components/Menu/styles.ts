import styled from 'styled-components'

import AbsoluteContainer from '../../../../AbsoluteContainer'

export const Container = styled(AbsoluteContainer)`
  ${({ theme }) => theme.useTypography('p')}

  background-color: ${({ theme }) => theme.colors.white};
  font-size: 14px;

  > div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    > div {
      padding: ${({
        theme: {
          spacings: { s3 },
        },
      }) => `${s3} 0 ${s3} ${s3}`};
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }
`

export const Header = styled.div`
  ${({ theme }) => theme.useTypography('p')}

  display: flex;
  flex-direction: column;
  gap: ${({
    theme: {
      spacings: { s3 },
    },
  }) => s3};
  padding: ${({
    theme: {
      spacings: { s3 },
    },
  }) => `0 ${s3} ${s3} 0`};
  > div {
    display: flex;
    justify-content: space-between;
  }
`

export const Title = styled.div`
  ${({ theme: { useTypography } }) =>
    useTypography('p', { fontWeight: 'bold' })}
  font-size: 14px;
  color: ${({ theme: { getColor } }) => getColor('greyishBlue', 50)};
`

export const Item = styled.div`
  ${({ theme }) => theme.useTypography('p')}

  padding: ${({
    theme: {
      spacings: { s1 },
    },
  }) => `${s1} ${s1} ${s1} 0`};
  display: flex;
  align-items: center;

  &:not(:last-child) {
    border-bottom: 1px solid
      ${({ theme: { getColor } }) => getColor('greyishBlue', 25)};
  }

  > div:nth-child(1) {
    flex: 1;

    > div:nth-child(1) {
      ${({ theme: { useTypography } }) => useTypography('p')}
      font-size: 14px;
      color: ${({ theme: { getColor } }) => getColor('greyishBlue', 50)};
    }
    > div:nth-child(2) {
      ${({ theme: { useTypography } }) => useTypography('p')}
      font-size: 14px;
    }
  }
  > div:nth-child(2) {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`
