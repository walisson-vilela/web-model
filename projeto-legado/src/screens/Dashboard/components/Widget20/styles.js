import styled from 'styled-components'

export const Container = styled.div`
width: 281px;
height: 127px;
background: #FFFFFF 0% 0% no-repeat padding-box;
box-shadow: 0px 3px 6px #0000001A;
opacity: 1;
display:flex;
flex-direction:column;
align-items:center;
flex:1;
margin: 3px;
position:relative;

header{
    display:flex;
    flex-direction:column;
    align-items:center;

    strong{
    font: normal normal bold 18px/22px 'Lato';
    letter-spacing: 0px;
    color: #505D6F;
    opacity: 1;
    padding: 8px 0;
    }

    span{
        font: normal normal bold 14px/17px 'Lato';
        letter-spacing: 0px;
        color: #505D6F;
        opacity: 1;
        padding: 4px 0;
    }
}
`

export const Itens = styled.div`
margin-top:10px;
width: 209px;
height: 38px;
display:flex;
flex-direction:row;
align-items:center;
justify-content:center;
`


export const Item = styled.div`
 display:flex;
 flex-direction:column;
 align-items:center;
 justify-content:center;
 text-align:center;

 strong{
  font: normal normal medium 14px/17px Lato;
  letter-spacing: 0px;
  color: #6B7686;
  opacity: 1;
 }

 span{
    text-align: left;
    font: normal normal medium 14px/17px Lato;
    letter-spacing: 0px;
    color: #6B7686;
    opacity: 1;

 }

 &:first-child{
     padding-right:8px;
 }

 & + div{
     border-left: 1px solid #505D6F;
     padding-left:8px;
 }
`
