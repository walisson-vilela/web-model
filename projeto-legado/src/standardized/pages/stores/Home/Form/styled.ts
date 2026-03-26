import styled, { css } from 'styled-components'

export * from '../../../../components/form/components'

export const Form = styled.form`
  display: flex;
  height: 100%;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`

export const SubSection = styled.div`
  padding: 21px 14px;

  :not(:first-child) {
    border-top: 1px solid rgb(226, 226, 227);
  }
`

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.warningRed};

  ${({ children }) =>
    !children &&
    css`
      :after {
        content: ' ';
        white-space: pre;
      }
    `}
`
