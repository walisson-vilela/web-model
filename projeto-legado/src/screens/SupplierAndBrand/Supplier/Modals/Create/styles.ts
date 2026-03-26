import styled, { css } from 'styled-components'

export const ErrorMessage = styled.small`
  font-size: 14px;
  line-height: 17px;
  font-weight: 500;
  color: #c31717;

  ${(props) =>
    props.children
      ? null
      : css`
          :after {
            content: ' ';
            white-space: pre;
          }
        `}
`
