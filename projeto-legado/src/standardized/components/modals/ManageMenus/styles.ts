import styled from 'styled-components'

export const Title = styled.p`
  margin: 0;
  font-size: 16px;
  color: #162d48;
`

export const GridRowStyled = styled.div<{ itemSpacing: number }>`
  display: flex;
  gap: ${({ itemSpacing }) => `${itemSpacing}px`};
  margin-top: ${({ itemSpacing }) => `${itemSpacing}px`};
  border: 1px solid #e2e2e3;
  overflow: hidden;
  flex: 1;
  position: relative;
`

export const FiltersContainer = styled.div`
  margin: 0 !important;
  display: flex;
  align-items: center;
  position: relative;

  > * {
    padding: 0 14px;
    border-left: 1px solid #e2e2e3;
    height: 39px;
    display: flex;
    align-items: center;
  }
`

export const EmptyMessage = styled.div`
  flex: 1;
  align-self: center;
  justify-self: center;

  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.useTypography('p')}
  line-height: 17px;
  color: ${({ theme }) => theme.colors.grey};
`
