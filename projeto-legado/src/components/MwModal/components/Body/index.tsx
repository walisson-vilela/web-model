import React from 'react'

import { ThemeInterface } from '@mw-kit/mw-ui/types'
import { Modal, StrictModalContentProps } from 'semantic-ui-react'
import styled, { css } from 'styled-components'

type StyledModalBodyProps = StrictModalContentProps &
  React.HTMLAttributes<HTMLDivElement> & {
    $height?: string
    $minHeight?: string
    $maxHeight?: string
  } & Partial<{
    [K in
      | '$gap'
      | '$paddingLeft'
      | '$paddingRight'
      | '$paddingTop'
      | '$paddingBottom']: keyof ThemeInterface['spacings'] | '0'
  }>

type BodyComponent = React.FunctionComponent<StyledModalBodyProps>
const Body = styled(Modal.Content as never as BodyComponent)`
  .ui.modal > &&.content,
  &&.content {
    flex: 1;
    padding: ${({ theme }) => theme.spacings.s4};
    min-height: ${({ $minHeight: minHeight }) => minHeight || '89px'};
    ${({ $height: height }) =>
      height &&
      css`
        height: ${height};
      `}

    ${({ $maxHeight: maxHeight }) =>
      maxHeight &&
      css`
        max-height: ${maxHeight};
      `}

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${({ theme, $gap: gap }) =>
      gap ? theme.spacings[gap] : `calc(${theme.spacings.s1} / 2)`};

    ${({ theme }) => theme.useTypography('p')};
    line-height: 17px;
    color: ${({ theme }) => theme.getColor('greyishBlue', 70)};

    ${({ theme, $paddingLeft: paddingLeft }) => {
      if (!paddingLeft) return
      return css`
        padding-left: ${paddingLeft in theme.spacings
          ? theme.spacings[paddingLeft]
          : paddingLeft};
      `
    }};

    ${({ theme, $paddingRight: paddingRight }) => {
      if (!paddingRight) return
      return css`
        padding-right: ${paddingRight in theme.spacings
          ? theme.spacings[paddingRight]
          : paddingRight};
      `
    }};

    ${({ theme, $paddingBottom: paddingBottom }) => {
      if (!paddingBottom) return
      return css`
        padding-bottom: ${paddingBottom in theme.spacings
          ? theme.spacings[paddingBottom]
          : paddingBottom};
      `
    }};

    ${({ theme, $paddingTop: paddingTop }) => {
      if (!paddingTop) return
      return css`
        padding-top: ${paddingTop in theme.spacings
          ? theme.spacings[paddingTop]
          : paddingTop};
      `
    }};
  }
`

export default Body
