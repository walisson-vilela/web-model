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

export const LineAccent = styled(Line)`
  color: #e23851;
  font-weight: 600;
`

export const Footer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacings.s1};
  font-size: 13px;
  color: #4b5563;
`

export const FooterValue = styled.span<{ $color: string }>`
  color: ${({ $color }) => $color};
  font-weight: 700;
`

