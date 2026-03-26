import styled from 'styled-components'

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.spacings.s2}
    ${({ theme }) => theme.spacings.s3};
  gap: ${({ theme }) => theme.spacings.s1};
`

export const Value = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: #e23851;
`

export const Label = styled.span`
  font-size: 13px;
  color: #6b7280;
`
