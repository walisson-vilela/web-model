import styled from 'styled-components'

export const PopupTriggerWrapper = styled.span`
  display: flex;
  alignitems: center;
  cursor: pointer;
`

export const PopupContentWrapper = styled.div`
  h3 {
    ${({ theme }) => theme.useTypography('h3', { fontWeight: '600' })}
    line-height: 19px;
    margin-bottom: ${({ theme }) => theme.spacings.s1};
  }
  ul {
    ${({ theme }) => theme.useTypography('h5')}
    line-height: 17px;
    margin: 0;
    padding-left: ${({ theme }) => theme.spacings.s1};
    li::marker {
      content: '- ';
    }
    li:not(:last-child) p {
      margin-bottom: ${({ theme }) => theme.spacings.s3};
    }
  }
`
