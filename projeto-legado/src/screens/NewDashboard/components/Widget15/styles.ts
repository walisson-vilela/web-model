import styled from 'styled-components'

export const Container = styled.div`
  width: 18%;
  height: 264px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #0000001a;
  border-radius: 5px;
  opacity: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 8px;

  header {
    width: 100%;
    display: flex;
    height: 42px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 14px;
    margin: 4px 0;

    h1 {
      text-align: left;
      flex: 1;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font: bold 15px 'Lato';
      letter-spacing: 0px;
      color: #000000;
      opacity: 1;
      padding: 8px 0;
    }

    svg {
      position: relative;
      top: -5px;
      left: 3px;
      cursor: pointer;
    }
  }

  .widget15 {
    width: 201px;

    height: 264px;
    padding: 0 14pxs;
  }
`
export const Icons = styled.div`
padding: 8px 0;
width:60px;
display:flex;
flex-direction:row;
align-items:center;
justify-content:space-between;

margin-left:21px;
padding: 8px 0;
}
span{
    font-size:13px;
    display:inline-block;
    margin: 0 2px;

}

`
