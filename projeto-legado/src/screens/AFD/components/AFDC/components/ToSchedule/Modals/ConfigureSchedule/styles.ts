import styled from 'styled-components'

export const Content = styled.p`
  color: #263046;
  opacity: 70%;
  font-size: 14px;
`

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  button {
    width: 110px;
  }
`

export const ChipsContainer = styled.div`
  > div {
    min-height: 87.5px !important;
    align-content: flex-start;
    cursor: text;
    color: rgba(0, 0, 0, 0.87);
    border: 1px solid rgba(34, 36, 38, 0.15);
    border-radius: 0.28571429rem;

    > div:last-child {
      flex: unset !important;
    }

    input {
      font-size: 1em;
      font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
      color: rgba(0, 0, 0, 0.87);

      ::placeholder {
        color: rgba(191, 191, 191, 0.87);
      }
    }
  }
`
