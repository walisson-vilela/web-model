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

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 13px;
  color: #4b5563;
`
