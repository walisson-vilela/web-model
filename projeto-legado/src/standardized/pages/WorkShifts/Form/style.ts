import styled from 'styled-components'

export const ToleranceFieldWrapper = styled.span`
  > div > label {
    width: fit-content;
  }
`

export const FooterWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.s1};
  justify-content: end;
  margin-top: ${({ theme }) => theme.spacings.s3};

  border-top: 1px solid #e6e6e7;
  padding-top: ${({ theme }) => theme.spacings.s3};
`

export const ContentWrapper = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacings.s1};
`

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  padding-inline: ${({ theme }) => theme.spacings.s4};
  padding-block: 15px 14px;
`

export const LoaderContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.75);
  width: 100%;
  height: 100%;
  z-index: 99;
`

export const InputLabel = styled.div`
  label {
    ${({ theme }) => theme.useTypography('h5')}
    color: ${({ theme }) => theme.getColor('darkBlue')} !important;
  }
`
