import styled, { css } from 'styled-components'

interface MarkerProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  $left: string
  $bullet: boolean
  $firstChild: boolean
  $lastChild: boolean
}

const Marker = styled.div<MarkerProps>`
  position: absolute;
  top: 0;
  width: 40px;
  text-align: center;
  left: ${({ $left: left }) => left};
  z-index: 2;

  ${({ $firstChild: firstChild }) =>
    firstChild &&
    css`
      &:first-child {
        left: 0;
        text-align: left;

        &:after {
          left: 0;
        }
      }
    `}

  ${({ $lastChild: lastChild }) =>
    lastChild &&
    css`
      &:last-child {
        right: 0;
        left: unset;
        text-align: right;

        &:after {
          right: 0;
          left: unset;
        }
      }
    `}

  ${({ $bullet: bullet, theme }) => {
    if (!bullet) return
    return css`
      &:after {
        content: '';
        position: absolute;
        left: calc(50% - 5px);
        width: 10px;
        height: 10px;
        border-radius: 100%;
        border: 1px solid ${theme.colors.lightestGrey};
        background-color: ${theme.colors.white};
        box-shadow: 0px 1px 3px ${theme.getColor('black', 10)};
      }
    `
  }}
`

export default Marker
