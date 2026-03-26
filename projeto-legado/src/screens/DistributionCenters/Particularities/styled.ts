import styled from 'styled-components'

export const Title = styled.div`
  font-weight: normal;
  font-size: 16px;
  margin-bottom: 21px;
  padding-left: 7px;
  color: #263046cc;
`

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export const Row = styled.div`
  display: flex;
  overflow: hidden;
`

export const Col = styled.div`
  flex: 1;
  border-style: solid;
  border-width: 0;
  border-color: #e4e4e4;

  padding: 0 7px;
  :first-child {
    padding-left: 0;
  }
  :last-child {
    padding-right: 0;
  }
`

export const TableContainer = styled(Row)`
  flex: 1;
  margin-top: 14px;

  ${Col} {
    border-width: 0 1px;
  }
  ${Col}:first-child {
    border-width: 0 1px 0 0;
  }
  ${Col}:last-child {
    border-width: 0 0 0 1px;
  }
`
