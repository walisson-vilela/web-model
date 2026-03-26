import styled from 'styled-components'

interface CardContainerProps {
  color: string
}

export const CardContainer = styled.div<CardContainerProps>`
  width: 100% !important;
  border-radius: 5px;
  border: 1px solid #ccc;
  border-left: 5px solid !important;
  border-left-color: ${(props) => props.color} !important;
`
