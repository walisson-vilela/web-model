import { Modal, StrictModalHeaderProps } from 'semantic-ui-react'
import styled, { css } from 'styled-components'

import { HeaderColors } from '../../interfaces'

type StyledModalHeaderProps = StrictModalHeaderProps & {
  color?: HeaderColors
}

const colors: { [key in HeaderColors]: ReturnType<typeof css> } = {
  blue: css`
    background-color: #3455ab;
    color: ${({ theme }) => theme.colors.white};
  `,
  white: css`
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.greyishBlue};
  `,
  black: css`
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.greyishBlue};
  `,
  grey: css`
    background-color: ${({ theme }) => theme.colors.lightestGrey};
    color: ${({ theme }) => theme.colors.greyishBlue};
  `,
}

type HeaderComponent = React.FunctionComponent<StyledModalHeaderProps>
const Header = styled(Modal.Header as never as HeaderComponent)`
  .ui.modal > &&.header,
  &&.header {
    padding: ${({ theme }) => theme.spacings.s4};
    font-size: 18px !important;
    line-height: 22px;
    font-weight: bold;
    ${(props) => {
      if (!props.color) return css``
      return colors[props.color]
    }}
  }
`

export default Header
