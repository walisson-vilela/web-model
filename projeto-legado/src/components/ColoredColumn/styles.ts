import styled from 'styled-components'

interface ColoredColumnProps {
  color: string
  withDot: boolean
}

export const ColoredColumn = styled.span<ColoredColumnProps>`
  position: relative;
  color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const DotStatus = styled.div`
  content: '';
  width: 5px;
  height: 5px;
  background-color: #ef5350;
  border-radius: 50%;
  bottom: -8px;
`
