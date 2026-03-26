import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.s1};
  align-items: center;
`

export const PopupContent = styled.div`
  padding: ${({ theme }) => theme.spacings.s3};
  ${({ theme }) => theme.useTypography('p')};
  line-height: 17px;
`
