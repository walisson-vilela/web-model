import styled from 'styled-components'

export const Container = styled.div`
margin: 0 8px;
width: 27%;
height: 269px;
background-color: #F5F5F5;
opacity: 1;
box-shadow: 0px 3px 6px #0000001A;
border-radius: 5px;
padding:6px;
display:flex;
flex-direction:column;
justify-content:space-between;
padding: 14px;
header{
display:flex;
flex-direction:column;

div{
  width: 89px;
  height: 10px;
  background: #E7E7E7 0% 0% no-repeat padding-box;
  border: 1px solid #DEDEDE5E;
  opacity: 1;
  & + div{
   width: 50px;
   height: 10px;
   background: #EBEBEB 0% 0% no-repeat padding-box;
   border: 1px solid #DEDEDE5E;
   opacity: 1;

  }
}

}


section{
    flex: 1;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    align-items:flex-end;

    .first{
      width: 22px;
      height:56px;
      background: #EBEBEB 0% 0% no-repeat padding-box;
      border: 1px solid #DEDEDE5E;
    }

    .second{
        width:22px;
        height:73px;
        background: #EBEBEB 0% 0% no-repeat padding-box;
        border: 1px solid #DEDEDE5E;
        margin: 0 11px 0 9px;
    }

    .three{
        width: 22px;
        height: 61px;
        background: #EBEBEB 0% 0% no-repeat padding-box;
        border: 1px solid #DEDEDE5E;
        margin: 0 4px 0 9px;

    }

    .four{
        width: 22px;
        height: 27px;
        background: #E2E0E0 0% 0% no-repeat padding-box;
        opacity: 1;
        margin: 0 4px 0 4px;
    }

    .fith{
        width: 22px;
        height: 90px;
        background: #E2E0E0 0% 0% no-repeat padding-box;
        opacity: 1;
        margin: 0 4px 0 4px;
    }

    .six{
        width: 22px;
        height: 56px;
        background: #E2E0E0 0% 0% no-repeat padding-box;
        opacity: 1;
        margin: 0 4px 0 4px;
    }
}


}

`
