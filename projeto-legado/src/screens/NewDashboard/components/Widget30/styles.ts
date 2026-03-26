import styled from 'styled-components'

export const Container = styled.div`
  width: 19.8%;
  height: 288px;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  background: #ffffff 0% 0% no-repeat padding-box;
`

export const Atendences = styled.div`
  margin-bottom: 8px;
  width: 100%;
  min-width: 281px;
  padding: 14px;
  height: 142px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #0000001a;
  opacity: 1;
  border-radius: 5px;

  display: flex;
  flex-direction: column;

  img {
    cursor: pointer;
  }

  header {
    width: 100%;

    .content {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      strong {
        font: normal normal bold 15px Lato;
        letter-spacing: 0px;
        color: #000;
        opacity: 1;
        margin: 0;
      }
    }

    @media (max-width: 1390px) {
      .content {
        width: 90%;
        padding: 0 16px;
      }
    }

    @media (max-width: 1380px) {
      .content {
        width: 90%;
        padding: 0 16px;
      }
    }

    @media (max-width: 1360px) {
      .content {
        width: 90%;
        padding: 0 16px;
      }
    }
    @media (max-width: 1470px) {
      .content {
        width: 90%;
        padding: 0 8px;
      }
    }
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    strong {
      font: normal normal bold 18px Lato;
      letter-spacing: 0px;
      color: #505d6f;
      opacity: 1;
      margin: 0;
      & + strong {
        margin-top: 8px;
        font: normal normal bold 15px Lato;
      }
    }
  }
`

export const Pontuality = styled.div`
 margin-bottom:8px;
 width:100%;
 min-width:281px;
 padding: 14px;
 height:142px;

 box-shadow: 0px 3px 6px #0000001A;
 opacity: 1;
 border-radius: 5px;

 display:flex;
 flex-direction:column;

 img{
     cursor:pointer;
 }

 header{
     width:100%;

     .content{
         width:100%;
         display:flex;
         flex-direction:row;
         align-items:center;
         justify-content:space-between;
         strong{
            font: normal normal bold 15px Lato;
            letter-spacing: 0px;
            color: #000;
            opacity: 1;
            margin: 0;
   }
     }


     @media(max-width:1390px){
         .content{
             width:90%;
             padding: 0 16px;
         }
        }

     @media(max-width:1380px){
         .content{
             width:90%;
             padding: 0 16px;
         }
        }

     @media(max-width:1360px){
         .content{
             width:90%;
             padding: 0 16px;
         }
        }

    @media(max-width:1470px){
         .content{
             width:90%;
             padding: 0 8px;
         }
    }



 }
 div{
     display:flex;
     flex-direction:column;
     align-items:center;
     justify-content:center;
     flex:1;
    strong{
    font: normal normal bold 18px Lato;
    letter-spacing: 0px;
    color: #505D6F;
    opacity: 1;
    margin: 0;
    &+ strong{
        margin-top:8px;
        font: normal normal bold 15px Lato;
    }
 }


`
