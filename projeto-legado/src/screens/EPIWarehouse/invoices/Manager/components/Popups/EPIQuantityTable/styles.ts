import styled from 'styled-components'

export const TableContainer = styled.td`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

export const TableHeader = styled.tr`
  display: grid;
  grid-template-columns: 1fr 5fr;
  font-weight: 600;
  padding: 12px 24px;
`

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  border-top: 1px solid #eee;
  padding: 12px 24px;
  align-items: center;
`

export const Badge = styled.div`
  background: #F6F6F6;
  padding:0px 14px;
  font-size: 0.875rem;
  font-weight: bold;
  text-align: center;
  margin: 0 auto;
  border-radius: 50px;
  box-shadow: 0px 2px 3px #DEDEDEF2;
  letter-spacing: 0px;
  color: #707070;
  opacity: 1;
`

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 12px;
  color: #888;
`
