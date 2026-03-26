import styled, { css } from 'styled-components'

interface SVGContainerProps
  extends Omit<React.HtmlHTMLAttributes<HTMLDivElement>, 'color'> {
  $color: string
  $strokeWidth?: string
  $pointer: boolean
}

export const SVGContainer = styled.div<SVGContainerProps>`
  display: flex;
  color: ${({ $color: color }) => color};

  svg {
    display: block;
    width: 100%;
    height: 100%;

    &,
    * {
      stroke: currentColor;

      ${({ $strokeWidth: strokeWidth }) => {
        if (!strokeWidth) return

        return css`
          stroke-width: ${strokeWidth};
        `
      }}
    }
  }

  ${({ $pointer: pointer }) => {
    if (!pointer) return
    return css`
      cursor: pointer;
    `
  }}
`
