import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  & > div {
    width: 100% !important;

    label {
      margin-bottom: 7px !important;
      font-family: Lato, sans-serif !important;
      font-weight: normal !important;
      font-size: 14px !important;
      color: rgb(38, 48, 70) !important;
    }
  }
`

export const ErrorMessage = styled.span`
  margin-top: 3.5px;
  color: ${({ theme }) => theme.colors.red};
  display: inline-block;

  ${({ children }) => {
    if (children) return
    return css`
      :after {
        content: ' ';
        white-space: pre;
      }
    `
  }}
`
