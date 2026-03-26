import styled from 'styled-components'

export const Form = styled.form`
  width: 100%;
  max-width: 330px;
  display: flex;
  flex-direction: column;
  gap: 21px;

  > h1 {
    font-size: 32px;
    font-weight: normal;
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  input {
    min-height: 38px;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }
`
export const AccountField = styled.div`
  width: 100%;
  max-width: 330px;
  display: flex;
  flex-direction: column;
  align-items: flex-start !important;
`
