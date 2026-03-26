import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s3};
  padding: ${({ theme }) => theme.spacings.s4};
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s1};
`

export const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin: 0;
`

export const Description = styled.p`
  font-size: 14px;
  color: #4b5563;
  margin: 0;
`

export const Body = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const PlaceholderCard = styled.div`
  width: 100%;
  max-width: 640px;
  padding: ${({ theme }) => theme.spacings.s4};
  border-radius: 12px;
  border: 1px dashed #d4d4d5;
  background: #f9fafb;
  text-align: center;
  color: #6b7280;
  font-size: 15px;
`
