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
    margin-left: 3px;
    position: relative;

    header {
        width: 100%;
        display: flex;
        height: 42px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 8px;
        margin: 4px 0;

        h1{
            text-align: left;
            overflow:hidden;
             white-space:nowrap;
            text-overflow:ellipsis;
            font: bold 15px "Lato";
            letter-spacing: 0px;
            color: #000000;
            opacity: 1;
            padding: 8px 0;
        }

        div{
            margin-bottom: 2px
            max-width:80px;
            display:flex;
            flex-direction:row;
            align-items:center;
            justify-content:center;
        }

        svg{
            margin-bottom:3px;
            cursor:pointer;
        }



    }

    .widget15 {
        width: 201px;
        height: 264px;
        padding: 0 14px;
    }


    @media(min-width:1440px){
     width:215px;
 }

 @media(min-width:1500px) and (max-width: 1599px){
     width:229px;

 }

 @media(min-width:1600px) and (max-width: 1699px){
     width:280px;
 }


 @media(min-width:1700px){
     width:280px;


     .widget15{
        width: 253px;
        height: 180px;
     }
 }

 @media(min-width:1799px){
     width:280px;


     .widget15{
        width: 253px;
        height: 180px;
     }
 }

 @media(min-width:1800px){
    width: 300px;
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
