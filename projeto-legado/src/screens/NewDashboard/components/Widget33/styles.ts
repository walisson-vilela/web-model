import styled from 'styled-components'

export const Container = styled.div`
 width:19%;
 padding: 14px;
 height: 288px ;
 background: #FFFFFF 0% 0% no-repeat padding-box;
 box-shadow: 0px 3px 6px #0000001A;
 border-radius: 5px;
 opacity: 1;
 padding:14px;

 .header{
    width:100%;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
}
.wrapper{
    width:50px;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;

    a, svg{
        cursor:pointer;
    }
    svg{
     position: relative;
     bottom: 2px;
}
    }
}

.widget30{
    width:100%;
    max-width:200px;
    height:240px;

}
`
export const Content = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 0 10px;
`

export const Icons = styled.div`
  max-width: 120px;

  .wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .item-container {
      width: 100%;
      margin: 8px 0;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .bullet {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #3cc37b;
      margin-right: 4px;
      position: relative;

      span {
        display: inline-block;
        margin-left: 4px;
      }
      .bullet-icon {
        position: absolute;
        right: 0;
        top: 0;
        width: 5px;
        height: 5px;
        border-left: 1px solid #fff;
        border-bottom: 1px solid #fff;
        border-radius: 8px;
      }
    }

    .bullet2 {
      background-color: #e23851;
    }
  }
`
