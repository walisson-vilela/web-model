import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.s3};
  overflow: hidden;
`

export const Label = styled.label<{
  $invalid?: boolean
  $required?: boolean
  $disabled?: boolean
}>`
  display: flex;
  gap: ${({ theme }) => theme.spacings.s1};

  ${({ $disabled: disabled, $invalid: invalid, theme }) => {
    if (disabled) {
      return css`
        cursor: not-allowed;

        > div:first-child {
          background-color: #e0e1e2;
          color: #a6acb1;
        }
      `
    }

    return css`
      cursor: pointer;
      > div:first-child {
        background-color: ${theme.colors[invalid ? 'warningRed' : 'blue']};
        color: ${theme.colors.white};
      }
    `
  }}

  > div:first-child {
    padding: ${({ theme }) => `${theme.spacings.s1} ${theme.spacings.s3}`};
    font-weight: bold;
    border-radius: 4px;
    white-space: nowrap;
  }

  ${({ $required: required, $invalid }) => {
    if (!required) return
    return css`
      :after {
        content: '*';
      }
    `
  }}
`

export const FileName = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  overflow: hidden;

  > :last-child {
    cursor: pointer;
  }
`
