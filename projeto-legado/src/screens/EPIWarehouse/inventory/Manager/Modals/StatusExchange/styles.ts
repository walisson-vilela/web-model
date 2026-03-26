import styled from 'styled-components'

export const TabsContainer = styled.div`
  padding: 0 ${({ theme }) => theme.spacings.s4};
  flex: 1
`

export const TitleContainer = styled.div`
  padding: 0 ${({ theme }) => theme.spacings.s4};
  margin-bottom: ${({ theme }) => theme.spacings.s4};
`
export const ErrorBox = styled.div`
  background: #FEF5F5 0% 0% no-repeat padding-box;
  border: 1px solid #973937;
  color: #973937;
  font-size: 14px;
  padding: 1rem 2.8rem;
  border-radius: 4px;
  margin-top: 0.5rem;
  width: 100%;
`
