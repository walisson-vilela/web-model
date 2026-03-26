import styled from 'styled-components'

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${({ theme }) => theme.spacings.s2}
    ${({ theme }) => theme.spacings.s3};
`

export const Columns = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacings.s3};
`

export const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacings.s1};
  text-align: center;
`

export const MainValue = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: #111827;
`

export const Label = styled.span`
  font-size: 13px;
  color: #6b7280;
`

export const Divider = styled.div`
  width: 1px;
  align-self: stretch;
  background: #e5e7eb;
`
