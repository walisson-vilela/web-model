import styled, { css } from 'styled-components'

import LabelContainer from '../LabelContainer'
import NavBar from '../NavBar'

interface StyledLabelProps
  extends Omit<React.HtmlHTMLAttributes<HTMLDivElement>, 'width'> {
  $disabled?: boolean
  $required?: boolean
  $viewMode?: boolean
  $width?: string
}

const Label = styled.label<StyledLabelProps>`
  ${({ theme }) => theme.useTypography('p')}

  ${({ $width: width, $viewMode: viewMode }) => {
    if (width) {
      return css`
        width: ${width};
      `
    }

    return (
      !viewMode &&
      css`
        width: 100%;
      `
    )
  }};
  box-sizing: border-box;
  display: block;
  position: relative;

  ${({ $disabled: disabled }) => {
    if (!disabled) return

    return css`
      opacity: 0.5;
    `
  }}

  > ${LabelContainer} {
    ${({ $required: required, $viewMode: viewMode }) => {
      return (
        required &&
        !viewMode &&
        css`
          &:after {
            content: ' *';
          }
        `
      )
    }}
  }

  &:not(:hover) ${NavBar} {
    height: 0;
  }
`

export default Label
