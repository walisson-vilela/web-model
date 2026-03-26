import styled from 'styled-components'

export const InfoWindowContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.greyishBlue};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacings.s3};
  width: 244px;
  height: 89px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${({ theme }) => theme.useTypography('p')}
  line-height: 17px;

  border-radius: 2px;

  :after {
    content: '';
    background-color: ${({ theme }) => theme.colors.greyishBlue};

    position: absolute;
    top: calc(100% - 25px / 2);
    left: ${({ theme }) => theme.spacings.s3};
    width: 25px;
    height: 25px;
    transform: rotate(45deg);
  }
`
