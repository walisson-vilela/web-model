import styled from 'styled-components'

export const ApplyButton = styled.button`
  background: none;
  border: none;
  outline: none;
  padding: 0;

  background-color: ${({ theme }) => theme.colors.blue};
  border-radius: 3px;

  ${({ theme }) => theme.useTypography('h4')}
  color: ${({ theme }) => theme.colors.white};

  height: 35px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  transition-property: opacity;
  transition-duration: 0.25s;
  transition-timing-function: linear;

  &[aria-disabled='true'] {
    opacity: 0.5;
  }
  &:not([aria-disabled='true']) {
    cursor: pointer;
  }
`
