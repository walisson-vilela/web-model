import styled from 'styled-components'

export const JustificationContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  & > hr {
    width: 100%;
    outline: none;
    border: none;
    height: 1px;
    background: #e2e2e2;
    margin-block: 14px;
  }
`

export const Data = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;

  & > strong {
    font: normal normal bold 16px/15px Lato;
    color: #192338;
    margin-bottom: 7px;
  }

  & > span {
    display: flex;
    align-items: center;
    gap: 4px;

    & > svg {
      cursor: pointer;
    }

    & > label {
      cursor: pointer;
      font: normal normal normal 14px/15px Lato;
      color: #192338;

      & > strong {
        font-weight: bold;
      }

      & > input {
        display: none;
      }
    }
  }
`

interface StatusContainerProps {
  status: 'Aprovado' | 'Reprovado' | 'Expirado'
}

export const StatusContainer = styled.div<StatusContainerProps>`
  display: flex;
  align-items: center;
  gap: 7px;

  div {
    width: 10px;
    height: 30px;
    background-color: ${(props) =>
      props.status === 'Aprovado'
        ? '#66BB6A'
        : props.status === 'Reprovado'
        ? '#EF5350'
        : '#E0E1E2'};
  }

  span {
    color: ${(props) =>
      props.status === 'Aprovado'
        ? '#66BB6A'
        : props.status === 'Reprovado'
        ? '#EF5350'
        : '#E0E1E2'};
    font: normal normal bold 16px/15px Lato;
    letter-spacing: 0px;
  }
`

export const PopupContent = styled.div`
  padding: 7px;
  width: 294px;
  span {
    font: normal normal normal 14px/17px Lato;
    letter-spacing: 0px;
    color: #ffffff;
  }
`

export const attachmentText = styled.span`
  font: normal normal normal 14px/15px Lato;
  letter-spacing: 0px;
  color: #3455ab;
  cursor: pointer;

  strong {
    color: #000;
  }
`
