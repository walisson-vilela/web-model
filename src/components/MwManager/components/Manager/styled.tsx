import type React from 'react'

import styled, { css } from 'styled-components'

import * as GlobalStyles from '../../styled'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  $borderless?: boolean
}

export const Table = styled.table`
  margin: 0;
  border-collapse: collapse;
  box-sizing: border-box;

  width: 100%;
  height: 100%;
  min-height: 0;

  border: 1px solid #e2e2e3;
  background-color: #fff;

  overflow: hidden;
  display: flex;
  flex-direction: column;

  position: relative;
  border-radius: 0;

  thead {
    flex: 0 0 auto;
    display: block;
  }

  tbody {
    flex: 1 1 auto;
    display: block;
    min-height: 0;
  }
`

export const Container = styled(GlobalStyles.ThemeContainer)<ContainerProps>`
  flex: 1;
  height: 100%;
  min-height: 0;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  ${Table} {
    ${({ $borderless: borderless }) => {
      if (!borderless) return
      return css`
        border: none;
      `
    }}
  }
`
