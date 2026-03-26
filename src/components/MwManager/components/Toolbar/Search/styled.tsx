import styled from 'styled-components'

interface ContainerProps {
  $width?: string
}

export const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0;
  background-color: transparent;
  border: 0;
  box-shadow: none;
  &:not(:disabled) {
    cursor: pointer;
  }
`

export const Container = styled.div<ContainerProps>`
  width: ${({ $width: width }) => width || '100%'};

  & > form {
    width: 100%;
    height: 100%;

    & > div {
      width: 100%;
    }
  }
`
