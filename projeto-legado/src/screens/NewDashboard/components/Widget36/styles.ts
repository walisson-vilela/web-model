import styled from 'styled-components'

export const Container = styled.div`
  width: 81%;
  height: 288px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #0000001a;
  border-radius: 5px;
  opacity: 1;
  margin-left: 8px;
  padding: 14px;
  img {
    cursor: pointer;
  }

  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 8px 0;
    padding-bottom: 16px;

    svg {
      cursor: pointer;
    }

    strong {
      font: normal normal bold 15px Lato;
      letter-spacing: 0px;
      color: #000;
      opacity: 1;
      margin: 0;
    }
  }

  .widget31 {
    height: 200px;
  }
`
