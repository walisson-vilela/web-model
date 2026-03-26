import styled from 'styled-components'

export * from '../../styles'

export const Textarea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.spacings.s4};
  height: 200px;
  resize: none;
  border: none;
  font-family: 'Lato', sans-serif;

  ::placeholder {
    font-size: 18px;
    font-weight: bold;
    opacity: 0.5;
    color: ${({ theme }) => theme.colors.darkBlue};
  }
`
