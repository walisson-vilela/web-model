import styled from 'styled-components'

export const Container = styled.div`
  width: 27%;
  height: 269px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #0000001a;
  border-radius: 5px;
  opacity: 1;
  display: flex;
  flex-direction: column;
  padding: 14px;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4px;

    svg {
      cursor: pointer;
    }
  }
  strong {
    font: normal normal bold 14px/17px 'Lato';
    letter-spacing: 0px;
    color: #000000;
    opacity: 1;
    padding: 3px 6px;
  }
  span {
    color: grey;
    padding: 3px 10px;
  }
  .widget22 {
    height: 260px;
  }
`
