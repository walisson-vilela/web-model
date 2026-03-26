import styled from 'styled-components'

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: ${({ theme }) => theme.spacings.s2};
  padding-bottom: ${({ theme }) => theme.spacings.s2};
`

export const MoodsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacings.s3};
  max-width: 360px;
  margin: 0 auto;
`

export const MoodItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacings.s1};
`

export const MoodIcon = styled.img`
  width: 40px;
  height: 40px;
`

export const MoodValue = styled.span`
  font-size: 13px;
  color: #4b5563;
`
