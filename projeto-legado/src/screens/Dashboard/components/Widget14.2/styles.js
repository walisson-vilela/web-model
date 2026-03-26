import styled from 'styled-components'

export const Container = styled.div`
 display: flex;
 flex-direction:column;
 align-items:center;
 justify-content:center;
 position:relative;

 header{
     display:flex;
     flex-direction:column;
     align-items:center;
     justify-content:center;

     div{
         strong{
             margin:  0 2px;
         }
     }
 }

 .widget14{
     width:270px;
     height: 130px;
 }


`

export const Icons = styled.div`
 width:100%;
 max-width: 209px;
 height: 38px;
 display: flex;
 flex-direction:row;
 align-items:center;
 justify-content:space-between;
 position:relative;
 bottom: 24px;

`

export const Percentage = styled.strong`
 position:relative;
 bottom: 40px;
 font-size: 17px;
 font-weight: bold;

`


export const Item = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;


span{
    color:#6B7686;
}

& + div{
  border-left: 1px solid  #9AA1A9;
  padding-left:10px;

}
`
