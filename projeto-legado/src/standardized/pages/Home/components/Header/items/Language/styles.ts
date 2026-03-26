import styled, { css } from 'styled-components'

export { Item } from '../../styles'

export const Container = styled.div<{ $disabled?: boolean }>`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > svg {
    background-color: ${({ theme }) => theme.colors.white};
    width: 24px;
    height: 24px;
  }


  ${({ $disabled: disabled, onClick }) => {
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
  }}}`
