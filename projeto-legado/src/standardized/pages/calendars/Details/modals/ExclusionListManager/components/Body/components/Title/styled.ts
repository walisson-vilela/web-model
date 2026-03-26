import styled from 'styled-components'

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacings.s1};
  color: ${({ theme }) => theme.colors.black};
`
export const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s1};
  > :last-child {
    gap: ${({ theme }) => theme.spacings.s3};
  }
`

export const TitleText = styled.div`
  ${({ theme }) => theme.useTypography('h3')};
  line-height: 17px;
  font-weight: 600;
`

export const SubTitleText = styled.div`
  ${({ theme }) => theme.useTypography('p')};
`
export const SelectEventContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacings.s1};
  z-index: 6;
`
