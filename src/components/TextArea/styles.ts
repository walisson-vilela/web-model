import styled from 'styled-components'

import type { StyledTextAreaProps } from './interfaces'

export const Container = styled.textarea<StyledTextAreaProps>`
  width: ${({ $width: width }) => width};
  height: ${({ $height: height }) => height};
  resize: none;
  outline: 0;
  border: 1px solid #c8c8c8;
  padding: 14px;
  border-radius: 4px;
  color: #192338;
`
