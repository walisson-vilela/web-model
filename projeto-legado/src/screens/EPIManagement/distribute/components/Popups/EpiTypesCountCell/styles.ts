import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 360px;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border-bottom: 1px solid #dadadb;

  > div:first-child {
    color: #000000cc;
    font-weight: normal;
    width: 231px;

    > b {
      font-weight: 900;
    }

    > p {
      margin: 0;
      font-size: 16px;
    }
  }
`

export const Body = styled.div`
  max-height: 220px;
  overflow-y: auto;
  color: #263046;
`

export const Trigger = styled.div`
  cursor: pointer;
  text-align: center;
`

export const Value = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #111827;
`

export const Label = styled.div`
  font-size: 12px;
  color: #6b7280;
`
