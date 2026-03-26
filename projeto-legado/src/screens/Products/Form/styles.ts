import styled from 'styled-components'

export * from '../../../standardized/components/form/components'

export const Form = styled.form`
  margin-top: ${({ theme }) => theme.spacings.s3};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s3};
`
