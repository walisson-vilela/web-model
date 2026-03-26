import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

export const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 14px;
  border-bottom: 1px solid #e2e2e3;
`

export const HeaderSort = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  span {
    color: #263046;
    font-size: 14px;
    font-weight: bold;
  }
`

export const Content = styled.div`
  flex: 1;
  overflow-y: auto;
`
