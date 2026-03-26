import styled, { css } from 'styled-components'

import { isKeyOf } from '../../functions/common'
import { getBorder, getSpacings, keys } from '../../functions/formatters'
import AbsoluteContainer from '../AbsoluteContainer'

import type { StyledContainerProps, StyledOptionProps } from './interfaces'

export const Option = styled.div<StyledOptionProps>`
  ${({ theme }) =>
    theme.useTypography('p', {
      lineHeight: theme.spacings.s3,
    })}
  color: ${({ theme }) => theme.colors.darkBlue};
  display: flex;
  gap: ${({ theme }) => theme.spacings.s1};

  > :nth-child(1) {
    display: flex;
    align-items: center;
    flex: 1;
    max-width: 100%;
  }

  ${({ $disabled: disabled }) => {
    if (!disabled) {
      return css`
        cursor: pointer;
      `
    }

    return css`
      pointer-events: none;
      opacity: 0.3;
    `
  }};

  ${({ $border: border, theme }) => {
    if (!border) return

    const config = getBorder(border)

    return keys(config)
      .filter((k) => config[k] !== undefined)
      .map((pos) => {
        const cfg = config[pos] as Exclude<
          (typeof config)[typeof pos],
          undefined
        >

        const width = cfg.width || '1px'
        const style = cfg.style || 'solid'
        const color = isKeyOf(theme.colors, cfg.color)
          ? theme.colors[cfg.color]
          : cfg.color

        return css`
          border-${pos}-width: ${width};
          border-${pos}-style: ${style};
          border-${pos}-color: ${color};
        `
      })
  }};

  &:hover {
    background-color: ${({ theme }) => theme.getColor('blue', 15)};
  }

  ${({ $highlighted: highlighted }) => {
    if (!highlighted) return
    return css`
      background-color: ${({ theme }) => theme.getColor('blue', 15)};
    `
  }}
`

export const Delimiter = styled.div`
  ${({ theme }) => theme.useTypography('p')};

  border-bottom: 1px solid ${({ theme }) => theme.colors.greyishBlue};
  margin: 14px;
  width: calc(100% - 28px);
`

export const Container = styled(AbsoluteContainer)<StyledContainerProps>`
  display: flex;

  > div {
    display: flex;
    width: 100%;

    > div:nth-child(1) {
      background-color: ${({ theme }) => theme.colors.white};
      border-radius: 4px;

      ${({ $containerSpacing: containerSpacing, theme }) => {
        if (!containerSpacing) return

        let spacing = getSpacings(containerSpacing)
        const tmp = spacing.split(' ')
        tmp[1] = `calc(${theme.spacings.s1} / 2)`
        spacing = tmp.join(' ')

        return css`
          padding: ${spacing};
        `
      }}
    }

    ${({ $bordered: bordered }) => {
      if (!bordered) return

      return css`
        ${Option} {
          &:not(:last-child) {
            border-bottom: 1px solid
              ${({ theme }) => theme.getColor('greyishBlue', 10)};
          }
        }
      `
    }}

    ${({ $itemSpacing: itemSpacing, theme }) => {
      if (!itemSpacing) {
        return css`
          ${Delimiter} {
            margin: ${theme.spacings.s1} 0px ${theme.spacings.s1}
              ${theme.spacings.s1};
          }
        `
      }

      const spacing = getSpacings(itemSpacing, { right: '0' })

      return css`
        ${Option} {
          padding: ${spacing};
        }
        ${Delimiter} {
          margin: ${spacing};
        }
      `
    }}
  }
`
