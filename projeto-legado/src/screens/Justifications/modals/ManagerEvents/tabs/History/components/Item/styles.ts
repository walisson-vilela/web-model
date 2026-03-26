import styled from 'styled-components'

export const ListItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border: 1px solid #e2e2e3;
  border-radius: 4px;
  padding: 7px;
`

export const ItemInfo = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 7px;
`

export const ItemFile = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #e2e2e3;
`

interface ItemStatusProps {
  status: 'Concluído' | 'Interrompido' | 'Removido'
}

export const ItemStatus = styled.div<ItemStatusProps>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  justify-content: center;

  & > span {
    font: normal normal normal 14px/17px Lato;
    letter-spacing: 0px;
    color: #192338;

    & > p {
      display: inline;
      font: normal normal normal 14px/17px Lato;
      letter-spacing: 0px;
      color: ${(props) =>
        props.status === 'Concluído'
          ? '#3455ab'
          : props.status === 'Interrompido'
          ? '#E23851'
          : '#192338'};
    }
  }
`
