import styled, { css } from 'styled-components'

import COLORS from '../../../../../../../../../components/GoogleMap/Marker/colors'

export const InfoWindowContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.greyishBlue};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacings.s3};
  width: 247px;
  height: 93px;
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

export const Subtitle = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.spacings.s3};
  left: ${({ theme }) => theme.spacings.s3};
  padding: ${({ theme }) => `${theme.spacings.s1} ${theme.spacings.s3}`};
  background-color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.useTypography('p')}
  line-height: 17px;

  color: ${({ theme }) => theme.colors.darkBlue};

  > div:nth-child(1) {
    cursor: pointer;
  }

  > div:nth-child(2) {
    position: absolute;

    width: 270px;
    background-color: ${({ theme }) => theme.colors.white};
    padding: ${({ theme }) => theme.spacings.s3};

    bottom: calc(100% + ${({ theme }) => theme.spacings.s3});
    left: 0;

    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacings.s3};

    > div {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.spacings.s1};

      > div {
        display: flex;
        gap: ${({ theme }) => theme.spacings.s1};
      }
    }
  }
`

export const Circle = styled.div<{ $color: keyof typeof COLORS }>`
  ${({ $color: color }) => {
    const value = {
      YELLOW: COLORS.YELLOW,
      GREEN: COLORS.GREEN,
      BLUE: COLORS.BLUE,
      RED: COLORS.RED,
    }[color]

    return css`
      border: 1px solid ${value};
      background-color: ${value}1A;
    `
  }}

  width: 19px;
  height: 19px;
  border-radius: 100%;
`
