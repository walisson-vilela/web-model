import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;

  & > :first-child {
    border-right: 1px solid #dadadb;
  }
`

export const GridContainer = styled.div`
  width: 50%;
  display: flex;
  height: 260px;
  flex-direction: column;
  gap: 14px;

  padding-inline: 7px;

  & > span {
    font: normal normal 900 14px/24px Lato;
    color: #000000cc;
  }
`

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacings.s1};

  i {
    margin: 0 !important;
  }
`

export const ItemRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  & > span {
    font-size: 14px;
    color: #192338;
  }

  & > small {
    font-size: 12px;
    color: #8a8f99;
  }
`

export const DescriptionRow = styled.div`
  display: flex;
  align-items: center;
`
