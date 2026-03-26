import styled from 'styled-components'

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s1};
  width: 100%;
  color: #4b5563;
  font-size: 14px;
`

export const Line = styled.span`
  width: 100%;
`

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacings.s2};
  width: 100%;
`

export const RowItem = styled.span<{ $align?: 'right' | 'left' }>`
  flex: 1;
  text-align: ${({ $align = 'left' }) => $align};
  font-weight: 600;
`
