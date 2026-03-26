import styled from 'styled-components'

export const Container = styled.div`
  width: 20%;
  height: 264px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 8px;
`

export const TMO = styled.div`
  width: 100%;
  height: 100px;
  padding: 8px;
  display: flex;
  flex-direction: column;

  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #0000001a;
  border-radius: 5px;
  opacity: 1;
  display: flex;

  h1 {
    text-align: left;
    font: normal normal bold 14px 'Lato';
    letter-spacing: 0px;
    color: #000000;
    opacity: 1;
    padding: 8px 0;
  }

  strong {
    text-align: left;
    font: normal normal 900 22px/27px Lato;
    letter-spacing: 0px;
    color: #505d6f;
  }

  svg {
    position: absolute;
    z-index: 3;
    top: 5px;
    right: 5px;
    cursor: pointer;
  }

  @media (min-width: 1440px) {
    width: 100%;
  }

  @media (min-width: 1600px) and (max-width: 1699px) {
    width: 287px;
  }

  @media (min-width: 1700px) and (max-width: 1799px) {
    width: 300px;
  }
`

export const Raio = styled.div`
  margin-top: 5px;
  width: 100%;
  height: 159px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #0000001a;
  border-radius: 5px;
  opacity: 1;
  padding: 8px;
  position: relative;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    strong {
      text-align: left;
      font: normal normal bold 14px/17px 'Lato';
      letter-spacing: 0px;
      color: #000000;
      opacity: 1;
      flex: 1;
    }
    .item {
      width: 50px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      a {
        position: relative;
        top: -5px;
      }
    }
  }

  .widget18 {
    width: 100%;
    height: 135px;
    padding-bottom: 8px;
  }

  svg {
    position: absolute;
    z-index: 3;
    top: 5px;
    right: 5px;
    cursor: pointer;
  }
`
