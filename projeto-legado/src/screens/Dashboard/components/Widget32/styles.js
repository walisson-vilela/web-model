import styled from 'styled-components'


export const Container = styled.div`
width:100%;
max-width:885px;
background: #FFFFFF 0% 0% no-repeat padding-box;
box-shadow: 0px 3px 6px #0000001A;
border-radius: 5px;
padding: 8px;
margin-right:13px;
flex:1;
height:300px;
padding:12px;
display:flex;
flex-direction:column;


h1{
    font-size: 15px;
}
`

export const Content = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
margin-top:40px;

header{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    color:#D2D4D5;
    strong{
        font-size:17px;
        margin:4px 0;
        display:block
    }

    span{
        display:block;
        margin:4px 0;
        font-size: 15px;
    }
}
`



export const Item = styled.div`
 display: flex;
 flex-direction:column;
 align-items:center;
 justify-content:center;
 text-align:center;



 strong{
     font-size:16px;
     line-height:26px;
 }

 span{
     font-size: 14px;
     line-height:24px;
 }
 & + div{
     border-left: 1px solid #D2D4D5;
     padding-left:10px;
 }
`


export const Itens = styled.div`
width:150px;
display:flex;
flex-direction:row;
align-items:center;
justify-content: space-between;
margin:16px 0;
text-align:center;
color:#D2D4D5;
`
