import styled from 'styled-components'

export const Option = styled.div`
  display: flex;
  flex-direction: column;
  gap: calc(${({ theme }) => theme.spacings.s1} / 2);
  max-width: 100%;

  > div {
    :nth-child(1) {
      ${({ theme }) => theme.useTypography('p')}
      line-height: 17px;
      color: ${({ theme }) => theme.colors.darkSilver};
    }
    :nth-child(2) {
      ${({ theme }) => theme.useTypography('h6')}
      line-height: 16px;
      color: ${({ theme }) => theme.getColor('greyishBlue', 70)};
    }
  }
`
