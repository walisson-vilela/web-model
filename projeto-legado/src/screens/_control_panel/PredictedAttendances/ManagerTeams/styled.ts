import styled from 'styled-components'

import { COLORS } from './labels'

interface DotProps {
  color?: string
}

export const Dot = styled.div<DotProps>`
  width: 5px;
  height: 5px;
  background-color: ${(props) => props.color || COLORS.red};
  border-radius: 50%;
  margin: 3.5px auto 0 auto;
`

export const Link = styled.div`
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`
