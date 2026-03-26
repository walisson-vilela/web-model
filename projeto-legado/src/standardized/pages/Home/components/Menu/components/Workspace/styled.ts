import styled, { css } from 'styled-components'

import { useLoadingAnimation } from '../../../../styles'

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: ${({ theme }) => theme.spacings.s1};
  padding-top: ${({ theme }) => theme.spacings.s1};
  padding-bottom: ${({ theme }) => theme.spacings.s4};

  border-bottom: 1px solid ${({ theme }) => theme.colors.lightestGrey};
`

export const SearchContainer = styled.div`
  padding: 0 ${({ theme }) => theme.spacings.s3};
`

export const Row = styled.div`
  display: flex;
  align-items: center;

  padding: ${({
    theme: {
      spacings: { s1, s3, s4 },
    },
  }) => `${s3} ${s1} ${s3} ${s4}`};
  gap: ${({ theme }) => theme.spacings.s3};
  border-bottom: 1px solid ${({ theme }) => theme.getColor('lightestGrey')};
  cursor: pointer;

  background-color: ${({ theme }) => theme.colors.white};
  :hover {
    background-color: ${({ theme }) => theme.getColor('blue', 15)};
  }

  transition-property: background-color;
  transition-duration: 0.25s;
  transition-timing-function: linear;
`

export const InfoAccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: calc(${({ theme }) => theme.spacings.s1} / 2);
  ${({ theme }) => theme.useTypography('p')}
  line-height: 17px;

  color: ${({ theme }) => theme.colors.greyishBlue};

  > div:nth-child(2) {
    opacity: 0.5;
  }
`

export const Container = styled.div<{ $loading: boolean }>`
  position: relative;
  height: 56px;

  ${({ $loading: loading }) => loading && useLoadingAnimation()}

  > div {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 991;

    height: 100%;

    transition-property: width, opacity;
    transition-duration: 0.25s;
    transition-timing-function: linear;
  }
`

export const ImageContainer = styled.div`
  display: flex;

  ${({ onClick }) =>
    onClick &&
    css`
      cursor: pointer;
    `}

  > div {
    padding: calc(${({ theme }) => theme.spacings.s1} * 1.5);
    background-color: #111b31;
  }

  > div:nth-child(1) {
    min-width: 56px;
  }

  > div:nth-child(2) {
    color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.useTypography('h3')}
    flex: 1;
    padding-left: 0;

    display: flex;
    align-items: center;

    transition-property: opacity;
    transition-duration: 0.25s;
    transition-timing-function: linear;
  }
`

export const PopupContainer = styled.div`
  --pointer-size: 8px;

  position: absolute;
  top: ${({ theme }) => theme.spacings.s1};
  left: calc(100% + var(--pointer-size));

  background-color: ${({ theme }) => theme.colors.white};

  width: 378px;
  height: 502px;

  box-shadow: ${({ theme }) => theme.getColor('black', 15)} 0px 3px 6px;
  border: 1px solid ${({ theme }) => theme.colors.lightestGrey};

  :before,
  :after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-width: 1px;
    border-style: solid;
    border-color: transparent;
    right: 100%;
  }

  :after {
    top: calc(
      ${({ theme }) => theme.spacings.s3} + var(--pointer-size) + 1.5px
    );
    border-width: calc(var(--pointer-size) - 1.5px)
      calc(var(--pointer-size) - 1.5px) calc(var(--pointer-size) - 1.5px) 0;
    border-right-color: ${({ theme }) => theme.colors.white};
  }

  :before {
    top: calc(${({ theme }) => theme.spacings.s3} + var(--pointer-size));
    border-width: var(--pointer-size) var(--pointer-size) var(--pointer-size) 0;
    border-right-color: ${({ theme }) => theme.colors.lightestGrey};
  }

  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s3};
`
