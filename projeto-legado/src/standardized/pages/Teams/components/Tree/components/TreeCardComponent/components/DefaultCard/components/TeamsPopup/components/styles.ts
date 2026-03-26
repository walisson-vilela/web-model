import styled from 'styled-components'

export const ErrorMessage = styled.div`
  margin-top: ${({ theme }) => theme.spacings.s1};
  ${({ theme }) => theme.useTypography('h6', { fontWeight: '500' })}
  color: ${({ theme }) => theme.colors.warningRed};
  &:not(:has(span)):after {
    content: ' ';
    white-space: pre;
  }
`

export const TeamsPopupWrapper = styled.div`
  > div {
    padding: ${({ theme }) => `${theme.spacings.s3} ${theme.spacings.s4}`};

    :nth-child(1) {
      border-bottom: 1px solid ${({ theme }) => theme.colors.lightGrey};
    }

    :nth-child(2) {
      display: flex;
      justify-content: end;
      align-items: end;
    }
  }
`
