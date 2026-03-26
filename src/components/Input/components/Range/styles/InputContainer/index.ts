import styled, { css } from 'styled-components'

import Input from '../Input'
import SelectedArea from '../SelectedArea'

interface InputContainerProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  $invalid?: boolean
}

const InputContainer = styled.div<InputContainerProps>`
  flex: 1;
  display: flex;
  gap: 6px;

  > div {
    position: relative;
  }

  ${({ theme, $invalid: invalid }) => {
    if (!invalid) {
      return css`
        ${SelectedArea} > span {
          background-color: ${theme.colors.blue};
        }

        ${Input} {
          /** firefox */
          &::-moz-range-thumb {
            border-color: ${theme.colors.lightestGrey};
          }
          /** ie */
          &::-ms-thumb {
            border-color: ${theme.colors.lightestGrey};
          }
          /** chrome */
          &::-webkit-slider-thumb {
            border-color: ${theme.colors.lightestGrey};
          }
        }
      `
    }

    return css`
      ${SelectedArea} > span {
        background-color: ${theme.colors.warningRed};
      }

      ${Input} {
        /** firefox */
        &::-moz-range-thumb {
          border-color: ${theme.colors.warningRed};
        }
        /** ie */
        &::-ms-thumb {
          border-color: ${theme.colors.warningRed};
        }
        /** chrome */
        &::-webkit-slider-thumb {
          border-color: ${theme.colors.warningRed};
        }
      }
    `
  }}
`

export default InputContainer
