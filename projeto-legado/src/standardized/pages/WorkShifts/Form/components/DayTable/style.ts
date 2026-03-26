import styled from 'styled-components'

export const DayTableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: ${({ theme }) => theme.spacings.s3};
  border: 1px solid ${({ theme }) => theme.getColor('lightestGrey')};
`
