import { MwEllipsisContainer, MwMenu } from '@mw-kit/mw-ui'
import styled, { css } from 'styled-components'

export { Initials, Item } from '../../styles'

export const Container = styled.div<{ $disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 152px;
  height: 100%;
  margin-right: ${({ theme }) => theme.spacings.s3};

  ${({ $disabled: disabled, onClick }) => {
    if (disabled) {
      return css`
        opacity: 0.25;
      `
    }

    if (!onClick) {
      return
    }

    return css`
      cursor: pointer;
    `
  }}}`

export const Name = styled(MwEllipsisContainer)`
  ${({ theme }) => theme.useTypography('h3')}
  line-height: 19px;
  margin: ${({ theme }) =>
    `0 calc(${theme.spacings.s1} * .75) 0 ${theme.spacings.s4}`};
`

export const Menu = styled(MwMenu)`
  width: 251px;

  /* TODO: use theme color */
  --bgColor: #f9f9f9;

  background-color: var(--bgColor);
  > div {
    background-color: var(--bgColor);

    > div:nth-child(1) {
      background-color: var(--bgColor);

      > div:nth-child(2) {
        background-color: ${({ theme }) => theme.colors.white};
      }
    }
  }

  :before {
    content: '';

    position: absolute;
    top: -17px;
    right: 14px;
    z-index: 2;

    width: 0px;
    height: 0px;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-bottom: 18px solid var(--bgColor);
  }
`

export const MenuHeader = styled.div`
  display: flex;
  gap: calc(${({ theme }) => theme.spacings.s1} * 1.5);
  padding: ${({ theme }) =>
    `${theme.spacings.s1} 0 ${theme.spacings.s1} ${theme.spacings.s3}`};

  color: ${({ theme }) => theme.colors.greyishBlue};
  ${({ theme }) => theme.useTypography('p')}
  line-height: 17px;

  > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    gap: calc(${({ theme }) => theme.spacings.s1} * 0.5);
    overflow: hidden;

    > div {
      display: flex;
      gap: calc(${({ theme }) => theme.spacings.s1} * 0.5);

      > div:nth-child(2) {
        color: ${({ theme }) => theme.getColor('greyishBlue', 50)};
      }
    }
  }
`
