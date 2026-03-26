import styled from 'styled-components'

export const Content = styled.div`
  display: flex;
  flex: 1;
  padding: 35px 21px 21px 21px;

  label {
    color: #192338 !important;
    font-size: 14px !important;
    font-weight: normal !important;
    margin-bottom: 7px !important;
  }

  form {
    display: flex;
    flex-direction: column;

    width: 50%;
    gap: 21px;
  }

  small {
    display: block;
    margin-top: 7px;
    color: #c70101;
    font-weight: normal;
    font-size: 14px;
  }

  .field {
    margin-bottom: 35px !important;
  }

  .form-field {
    width: 294px !important;
  }

  div > .popup-field,
  div > .popup-field::before {
    background-color: #263046 !important;
  }
`
