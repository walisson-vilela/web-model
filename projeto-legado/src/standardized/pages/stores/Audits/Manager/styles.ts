import styled from 'styled-components'

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: ${({ theme }) => theme.spacings.s6};
  padding: ${({ theme }) => theme.spacings.s3};
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
    position: relative;
  }
`
