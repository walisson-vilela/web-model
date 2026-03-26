import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;
  top: 0;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #ecedef;
  opacity: 0.8;

  cursor: pointer;
  color: ${({ theme }) => theme.colors.darkBlue};

  transition-property: left, right;
  transition-timing-function: linear;
  transition-duration: 0.25s;

  z-index: 3;
`
