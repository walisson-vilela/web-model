import styled, { css } from 'styled-components'

export const Label = styled.label`
  > div:first-child {
    display: inline-block;
    margin-bottom: 7px;
  }
  > :nth-child(2) {
    display: block;
  }
`

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`

export const ErrorMessage = styled.span`
  margin-top: 3.5px;
  color: #c70101;
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
