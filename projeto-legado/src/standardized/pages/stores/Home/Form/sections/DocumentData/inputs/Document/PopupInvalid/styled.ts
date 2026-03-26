import styled from 'styled-components'

export const Container = styled.div`
  width: 374px;
  ${({ theme }) => theme.useTypography('p', { fontWeight: 'bold' })}
  line-height: 17px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s1};
`
