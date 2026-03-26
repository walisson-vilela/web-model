import styled from 'styled-components'

export { Initials } from '../../../styles'

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacings.s3};

  padding: ${({ theme }) =>
    `${theme.spacings.s3} 0 ${theme.spacings.s3} ${theme.spacings.s4}`};

  border-bottom: 1px solid ${({ theme }) => theme.colors.lightestGrey};

  > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    gap: 5px;

    > div {
      line-height: 17px;
      :nth-child(1) {
        ${({ theme }) => theme.useTypography('h4')}
        color: ${({ theme }) => theme.colors.greyishBlue};
      }
      :nth-child(2) {
        ${({ theme }) => theme.useTypography('p')}
        color: ${({ theme }) => theme.getColor('greyishBlue', 70)};
      }
    }
  }
`
