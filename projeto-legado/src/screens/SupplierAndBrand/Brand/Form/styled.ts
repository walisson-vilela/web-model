import styled from 'styled-components'

export * from '../../../../standardized/components/form/components'

export const Form = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`

export const SubSection = styled.div`
  padding: ${({ theme }) => theme.spacings.s4};

  :not(:first-child) {
    border-top: 1px solid rgb(226, 226, 227);
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }
`
