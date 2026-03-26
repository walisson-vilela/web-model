import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  flex: 1;

  > {
    :nth-child(1) {
      font-size: 16px;
      line-height: 24px;
      letter-spacing: 0px;
      color: #263046cc;
    }
    :nth-child(2) {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
  }
`

export const EmptyMessage = styled.div`
  color: #b2b2b2;
  font-size: 16px;
  text-align: center;

  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`
