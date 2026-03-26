import styled from 'styled-components'

export const Container = styled.div`
  padding-top: 40px;
  padding: ${({ theme }) => theme.spacings.s3} 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s3};

  ${({ theme }) => theme.useTypography('p')};
  line-height: 17px;
  color: ${({ theme }) => theme.colors.greyishBlue};

  > div {
    :nth-child(1) {
      padding-top: ${({ theme }) => theme.spacings.s4};
    }
    :nth-child(2) {
      padding-bottom: ${({ theme }) => theme.spacings.s3};

      flex: 1;
      display: flex;

      background-image: ${({ theme }) => {
        const color = theme.colors.lightGrey
        return `linear-gradient(${color}, ${color})`
      }};
      background-size: 1px calc(100% - ${({ theme }) => theme.spacings.s6} * 2);
      background-repeat: no-repeat;
      background-position-x: calc(50% - 0.5px);
      background-position-y: ${({ theme }) => theme.spacings.s6};

      > div {
        width: 50%;

        :nth-child(1) {
          display: flex;
          flex-direction: column;
          gap: ${({ theme }) => theme.spacings.s4};
        }
      }
    }
  }
`

export { Section } from '../styles'
