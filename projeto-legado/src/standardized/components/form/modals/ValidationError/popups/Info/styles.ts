import styled from 'styled-components'

export { List } from '../../styles'

export const InfoContainer = styled.div`
  width: 430px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s3};
  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.useTypography('p')}
  line-height: 17px;

  :before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.greyishBlue};
    border-radius: 4px;
    z-index: -1;
  }

  :after {
    content: '';
    position: absolute;
    top: calc(50% - 5px);
    right: -4px;
    transform: rotate(45deg);
    width: 9.9px;
    height: 9.9px;
    background-color: ${({ theme }) => theme.colors.greyishBlue};
    z-index: 2;
  }

  > div {
    :nth-child(1) {
      ${({ theme }) => theme.useTypography('h2')};
      line-height: 21px;
    }
  }
`
