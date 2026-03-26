import styled from 'styled-components'

export const Container = styled.div`
 width:19%;
 padding: 14px;
 height: 288px ;
box-shadow: 0px 3px 6px #0000001A;
border-radius: 5px;
margin-left:8px;
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

    width:100%;
    flex: 1;
    padding: 14px;
    display:flex;
    flex-direction:column;

    margin: auto;

    .ball{
      max-width:200px;
      height:200px;

      background: #EBEBEB 0% 0% no-repeat padding-box;
      border: 1px solid #DEDEDE5E;
      margin:8px 0;
      border-radius:50%;
    }




}


}

`
