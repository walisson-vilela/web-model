import styled from 'styled-components'

export const Item = styled.div`
  width: 100%;
  background: #f9f8f8;
  display: flex;
  flex-direction: column;
  padding: 7px;
  gap: 7px;

  & > span {
    font: normal normal normal 14px/15px Lato;
    color: #192338;

    & > strong {
      font-weight: bold;
    }

    & > svg {
      cursor: pointer;
    }
  }
`

export const OpenModal = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 7px;

  & > span {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    font: normal normal normal 14px/17px Lato;
    letter-spacing: 0px;
    color: #192338;
  }

  & > strong {
    font: normal normal bold 14px/17px Lato;
    letter-spacing: 0px;
    color: #192338;
  }
`
