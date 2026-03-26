import styled from 'styled-components'

export const TableContainer = styled.div`
  width: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
`

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 80px;
  font-weight: 600;
  padding: 12px 16px;
  color: #4b5563;
  font-size: 12px;
  background: #f9fafb;
`

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 80px;
  padding: 12px 16px;
  align-items: center;

  &:not(:last-child) {
    border-top: 1px solid #f3f4f6;
  }
`

export const Badge = styled.div`
  background: #f6f6f6;
  padding: 2px 14px;
  font-size: 13px;
  font-weight: 700;
  text-align: center;
  border-radius: 50px;
  box-shadow: 0px 2px 3px #dededef2;
  color: #707070;
  min-width: 36px;
  justify-self: center;
`

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 12px;
  color: #888;
`
