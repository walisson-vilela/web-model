import styled, { css } from 'styled-components'

export { Footer } from '../../../standardized/components/form/components'

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex: 1;

  > div:nth-child(1) {
    overflow: auto;
  }
`

export const Section = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.lightestGrey};
  border-radius: 4px;
  padding: ${({ theme }) => `${theme.spacings.s3} ${theme.spacings.s4}`};

  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s3};
  margin-bottom: auto;
`

export const Title = styled.div`
  ${({ theme }) => theme.useTypography('h1')};
  line-height: 22px;
`

export const PasswordContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.s6};
`

export const Error = styled.div<{ $lines?: number }>`
  ${({ theme }) => theme.useTypography('p')};
  line-height: 17px;
  color: ${({ theme }) => theme.colors.warningRed};
  margin-top: ${({ theme }) => theme.spacings.s1};

  ${({ children, $lines: lines }) => {
    if (children) return

    const content = Array(lines || 1)
      .fill('\\A')
      .join('')

    return css`
      :after {
        content: '${content}';
        white-space: pre;
      }
    `
  }}
`

export const PasswordInputContainer = styled.div`
  width: 250px;
`
