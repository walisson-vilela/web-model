import styled, { css } from 'styled-components'

import { useLoadingAnimation } from '../../../../styles'

type ItemProps = {
  $loading?: boolean
  $disabled?: boolean
}

const Item = styled.div<ItemProps>`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  z-index: 991;

  > svg {
    background-color: ${({ theme }) => theme.colors.white};
    width: 24px;
    height: 24px;
  }

  ${({ $loading: loading, $disabled: disabled, onClick }) => {
    if (!loading) {
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
    }

    return useLoadingAnimation()
  }}}
`

export default Item
