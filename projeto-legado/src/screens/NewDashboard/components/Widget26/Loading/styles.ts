import styled from 'styled-components'

export const Container = styled.div`
width: 100%;
max-width: 325px;
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
    padding: 14px;
    display: grid;
    width: 100%;
    grid-template-columns: repeat(3, 1fr);
    margin: auto;

    .first{
    width:100%;
      background: #EBEBEB 0% 0% no-repeat padding-box;
      border: 1px solid #DEDEDE5E;
      margin: 0 11px 0 9px;
    }

    .second{
        width:100%;
        background: #EBEBEB 0% 0% no-repeat padding-box;
        border: 1px solid #DEDEDE5E;
        margin: 0 11px 0 9px;
    }

    .three{
        width:100%;
        background: #EBEBEB 0% 0% no-repeat padding-box;
        border: 1px solid #DEDEDE5E;
        margin: 0 4px 0 9px;

    }

    .four{
        width:100%;
        background: #E2E0E0 0% 0% no-repeat padding-box;
        opacity: 1;
        margin: 0 11px 0 9px;
    }

    .fith{
        width:100%;
        background: #E2E0E0 0% 0% no-repeat padding-box;
        opacity: 1;
        margin: 0 11px 0 9px;
    }

    .six{
        width:100%;
        background: #E2E0E0 0% 0% no-repeat padding-box;
        opacity: 1;
        margin: 0 11px 0 9px;
    }

    .seven{
        width:100%;
        background: #E2E0E0 0% 0% no-repeat padding-box;
        opacity: 1;
        margin: 0 11px 0 9px;
    }
    .eight{
      width:100%;
      background: #EBEBEB 0% 0% no-repeat padding-box;
      border: 1px solid #DEDEDE5E;
      margin: 0 11px 0 9px;
    }

    .nine{
        width:100%;
        background: #EBEBEB 0% 0% no-repeat padding-box;
        border: 1px solid #DEDEDE5E;
        margin: 0 11px 0 9px;
    }



}


}

`
