import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({
    theme: {
      spacings: { s3, s4 },
    },
  }) => `${s3} ${s4} 0px ${s4}`};
  min-height: 473px;
  max-height: 473px;

  > div:nth-last-child(1) {
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
`

export const StepBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div {
    :nth-child(1) {
      color: ${({ theme }) => theme.getColor('black', 80)};
      ${({ theme }) => theme.useTypography('h4')};
      line-height: 17px;
    }
    :nth-child(2) {
      display: flex;
      gap: ${({ theme }) => theme.spacings.s5};

      background-image: ${({ theme }) => {
        const color = theme.getColor('lightestGrey', 80)
        return `linear-gradient(${color}, ${color})`
      }};
      background-size: 100% 1px;
      background-repeat: no-repeat;
      background-position-y: calc(50% + (1px / 2));
    }
  }
`

export const StepBarItem = styled.div<{ $active?: true }>`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.white};
  gap: ${({ theme }) => theme.spacings.s3};
  padding: 0 ${({ theme }) => theme.spacings.s3};

  ${({ theme, $active }) =>
    !$active
      ? css`
          > div:nth-child(1) {
            border-color: ${theme.colors.lightGrey};
            color: ${theme.colors.lightGrey};
            background-color: ${theme.colors.white};
          }
        `
      : css`
          > div:nth-child(1) {
            border-color: ${theme.colors.blue};
            color: ${theme.colors.white};
            background-color: ${theme.colors.blue};
          }
        `}

  ${({ onClick }) =>
    onClick &&
    css`
      cursor: pointer;
    `}

   > div {
    :nth-child(1) {
      width: 36px;
      height: 36px;
      border-width: 1px;
      border-style: solid;

      border-radius: 100%;

      display: flex;
      justify-content: center;
      align-items: center;

      ${({ theme }) => theme.useTypography('h4')};
      line-height: 17px;

      transition-property: border-color color background-color;
      transition-timing-function: ease-in-out;
      transition-duration: 0.5s;
    }
    :nth-child(2) {
      ${({ theme }) => theme.useTypography('p')};
      line-height: 17px;
      color: ${({ theme }) => theme.colors.greyishBlue};
    }
  }
`
