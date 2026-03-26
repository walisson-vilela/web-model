import styled, { css } from 'styled-components'

import MwAbsoluteContainer from '../../../AbsoluteContainer'

export const Container = styled.div<{ $paddingless?: true }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s3};
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;

  ${({ theme, $paddingless: paddingless }) => {
    if (paddingless) return
    const { s3 } = theme.spacings
    return css`
      padding-top: ${s3};
      padding-bottom: ${s3};
      &:first-child {
        padding-left: ${s3};
      }
      &:last-child {
        padding-right: ${s3};
      }
    `
  }};
`

export const LabelContainer = styled.div`
  ${({ theme }) =>
    theme.useTypography('p', {
      lineHeight: theme.spacings.s3,
    })}
`

export const CalendarContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.lightestGrey};
`

export const AbsoluteContainer = styled(MwAbsoluteContainer)`
  > ${Container} {
    padding: ${({ theme }) =>
      `${theme.spacings.s3} ${theme.spacings.s3} ${theme.spacings.s1} ${theme.spacings.s3}`};
  }
`

export const MonthContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacings.s1};
  > div {
    margin: ${({ theme }) => theme.spacings.s1} 0;
    flex: 1;
    position: relative;
  }
`

export const MonthName = styled.div`
  ${({ theme }) =>
    theme.useTypography('h6', {
      lineHeight: theme.spacings.s3,
    })}
  color: ${({ theme }) => theme.colors.darkBlue};
  text-align: center;
`

export const MonthBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: calc(${({ theme }) => theme.spacings.s1} / 2);

  ${({ onClick }) => {
    if (!onClick) return

    return css`
      cursor: pointer;
    `
  }}
`

export const NavBtn = styled.button`
  ${({ theme }) =>
    theme.useTypography('p', {
      lineHeight: theme.spacings.s3,
    })}
  width: 21px;
  height: 32px;
  box-shadow: none;
  border: none;
  background-color: transparent;

  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    visibility: hidden;
  }
  &:not(:disabled) {
    cursor: pointer;
    &:hover {
      background-color: ${({ theme }) => theme.getColor('blue', 35)};
    }
  }

  transition-property: background-color;
  transition-timing-function: ease-in-out;
  transition-duration: 0.25s;
`
