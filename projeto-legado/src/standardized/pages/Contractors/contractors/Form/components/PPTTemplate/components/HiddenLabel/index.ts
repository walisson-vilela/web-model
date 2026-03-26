import styled, { css } from 'styled-components'

const HiddenLabel = styled.label<{ disabled?: boolean }>`
  display: flex;
  gap: calc(${({ theme }) => theme.spacings.s1} / 2);
  align-items: center;
  position: relative;

  ${({ disabled, theme }) =>
    disabled
      ? css`
          opacity: 0.5;
        `
      : css`
          cursor: pointer;
          :hover {
            color: ${theme.colors.blue};
          }
        `}

  input {
    width: 1px;
    height: 1px;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    padding: 0;
    border: 0;
  }
`

export default HiddenLabel
