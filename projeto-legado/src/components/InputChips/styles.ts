import styled from 'styled-components'

export const ChipsContainer = styled.div`
  > div {
    min-height: 138px !important;
    align-content: flex-start;
    cursor: text;
    color: rgba(0, 0, 0, 0.87);
    border: 1px solid rgba(34, 36, 38, 0.15);
    border-radius: 0.28571429rem;
    overflow: auto;

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
