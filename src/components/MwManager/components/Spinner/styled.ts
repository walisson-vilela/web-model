import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

interface SpinnerProps {
  $size: number
  $thickness: number
  $color: string
  $trackColor: string
}

export const Spinner = styled.div<SpinnerProps>`
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};

  border-radius: 999px;
  border: ${({ $thickness }) => `${$thickness}px`} solid
    ${({ $trackColor }) => $trackColor};
  border-top-color: ${({ $color }) => $color};

  animation: ${spin} 0.8s linear infinite;
`
