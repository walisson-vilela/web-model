import styled from 'styled-components'

export const ModalContent = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.lightestGrey};
  .ql-editor {
    overflow-y: unset;
    padding: 0;
  }
`
