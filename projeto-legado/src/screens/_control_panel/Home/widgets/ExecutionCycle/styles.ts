import styled from 'styled-components'

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  > div {
    padding: 0 14px;
    flex: 1;

    &:not(:last-child) {
      border-right: 1px solid #e2e2e3;
    }

    p {
      margin: 0;
      padding: 0;
      font-size: 14px;
    }

    p:first-child {
      font-size: 28px;
      font-weight: bold;
      display: flex;
      align-items: center;
      gap: 7px;
    }
  }
`

export const PopupContent = styled.table`
  padding-top: 14px;

  td {
    padding: 0 14px;
  }

  th {
    font-weight: bold;
  }

  tbody th {
    text-align: left;
  }
`
