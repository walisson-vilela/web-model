import { Segment } from 'semantic-ui-react'
import styled from 'styled-components'

export const Container = styled.div`
 height:100%;
 overflow-y: auto;
 padding-right: 1rem;



`

// Header
export const ContainerHeader = styled(Segment)`
 display:flex;
 align-items:center;
 justify-content:space-between;

 padding:4px;
 margin: 10px;
 border-radius:50%;


 h1{
 font-size: 18px;
     font-family:'Lato';
     color:#192338;
     opacity: 0.5;
     display:flex;
     align-items:center;
     padding-top:10px;
 }

 div{
     width:210px;
     display:flex;
     justify-content:space-evenly;
     align-items:center;

     button{
         width:49px;
         height:22px;
         border:none;
         background:transparent;


     }

     span{
         font-size: 14px;
         color:#000000CC;
         opacity: 1;
     }
 }
`
// #Header //

// Area da Foto //

export const PhotoContainer = styled(Segment)`
display:flex;
flex-direction:row;
justify-content:space-between;
align-items:center;
height:150px;

`

export const LeftContent = styled.div`
 display:flex;
 flex-direction:column;
h2{
 font: normal normal bold 18px Lato;
 color:#192338;
 opacity:1;
}




`

export const UserValidation = styled.div`

 strong{
    font-family:'Lato';
    font-size: 15px;
    font-weight:normal;
    color:#192338;
    opacity:1;
 }

 div{
     margin-top:10px;
     width:240px;
     display:flex;
     align-items:center;
     justify-content:space-between;

     input{
       width:141px;
       height:35px;
       background: #FFFFFF 0% 0% no-repeat padding-box;
       border: 1px solid #8B909B;
       border-radius: 4px;
       padding-left:8px;
     }

     button{
        width:78px;
        height:35px;
        border: 1px solid #3455aB;
        opacity:1;
        background:transparent;
        display:flex;
        align-items:center;
        justify-content:center;
        text-align:center;
        font-size: 14px;
        font-weight:bold;
        font-family:'Lato';
        color:#3455ab;
        opacity:1;
        border-radius:4px;
        cursor:pointer;

     }

 }

 .message-cpf{
     font-size: 14px;
     color:#C70101 !important;
     margin:6px 0 !important;
 }

`

export const RightContent = styled.div`
 width: 250px;
 display:flex;
 align-items:center;
 justify-content:space-between;


  .photo{
     width:80px;
     height:80px;

     img{
         width:100%;
         height:100%;
         border-radius:5px;
     }
 }
`

export const InputImage = styled.div`
 width:160px;


 label{
     display:flex;
     align-items:center;
     justify-content:center;
     width:141px;
     height:35px;
     font-size:14px;
     color:#3455AB;
     opacity:0.5;
     border: 1px solid #3455AB;
     font-weight:bold;
     border-radius:4px;

 }
 input[type="file"]{
     display:none;
 }

 span{
     display:inline-block;
     margin-top: 5px;
     font-size: 12px;
     color:#BFBFBF;
     opacity:1;
 }
`

//


// Dados Básicos

export const PersonalInfo = styled(Segment)`
display:flex;
flex-direction:column;
padding: 20px 25px !important;
h1{
font-size: 18px;
color:#192338;
opacity:0.5;
}
`

export const PersonalInfoContent = styled.div`
display:flex;
align-items: center;
justify-content:space-between;
`

export const InputName = styled.div`
 display:flex;
 flex-direction:column;
 align-items:flex-start;
 width:100%;
 max-width:357px;


 span{
    text-align: left;
    font: normal normal medium 16px  'Lato';
    letter-spacing: 0px;
    color: #192338;
    opacity: 0.5;
 }

 input{
     margin:4px 0;
     width:100%;
     height:35px;
     border: 1px solid #C8C8C8;
     border-radius:4px;
     padding-left:10px;
 }
`

export const InputEmail = styled.div`
 display:flex;
 flex-direction:column;
 align-items:flex-start;
 width:100%;
 max-width:310px;

 span{
    text-align: left;
    font: normal normal medium 16px  'Lato';
    letter-spacing: 0px;
    color: #192338;
    opacity: 0.5;
 }

 input{
     margin:4px 0;
     width:100%;
     height:35px;
     border: 1px solid #C8C8C8;
     padding-left:10px;
     border-radius:4px;
 }
`

export const InputPhone = styled.div`
 display:flex;
 flex-direction:column;
 width:100%;
 max-width:210px;
 span{
    text-align: left;
    font: normal normal medium 16px  'Lato';
    letter-spacing: 0px;
    color: #192338;
    opacity: 0.5;
 }
`




export const InputContent = styled.div`
 display:flex;
 margin:4px 0;
 border: 1px solid #C8C8C8;
 height: 35px;
 width:210px;
 display:flex;
 align-items:center;
 padding:5px;
 border-radius:4px;

 div{
     width:35px;
     display:flex;
     align-items:center;

     img{
         width:20px;
         height:13px;
     }

     div{
        width: 8px;
        height: 5px;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid #C8C8C8 ;
        margin-left:4px;
     }
 }

 input{
     border: 0;
     flex:1;
     padding-left:3px;
     width:calc(100% - 45px);


 }
`

// Dados De Acesso

export const AcessData = styled(Segment)`
height: 185px;

display:flex;
flex-direction:column;
align-items:flex-start;
 h2{
     font-size:18px;
     font-family: 'Lato';
     color:#192338;
     opacity:0.5;
     padding-top:15px;
     margin-left:10px;

 }

.warning-title{
    margin: 10px 0  0 20px !important;
    color:#a5a6a8 !important;
    font-size:14px;
}
`


export const AcessContent = styled.div`
 display:flex;
 flex-direction:row;
 align-items:center;




`


export const AcessInput = styled.div`
 display:flex;
 flex-direction:column;
 align-items: flex-start;
 margin: 0 16px;

 .menu{
     width: 180px !important;
     height:35px !important;
     border: 1px solid #C8C8C8 !important;

 }

 span{
    font-size:15px;
    color:#a5a6a8 !important;
    font-weight:500;
    font-family: 'Lato';
 }




 input{
     height:35px;
     width:310px;
     border: 1px solid #C8C8C8;
     margin-top: 15px;
     border-radius:4px;
     background:transparent;
 }


 button{
     margin: 25px 0 0 16px;
     height:35px;
     width:140px;
     border: 1px solid #3455aB;
     background:transparent;
     border-radius: 4px;
     font-size:13px;
     font-weight:bold;
     color:#3455ab;
     opacity:1;
 }



`

export const CustomAcessInput = styled.div`
 span{
    font-size:15px;
    color:#192330;
    font-weight:500;
    font-family: 'Lato';
    margin-bottom: 8px;
    display:block;
    color:#a5a6a8;
 }
div{
    width:310px;
    height:35px;
    display:flex;
    align-items:center;
    border: 1px solid #C8C8C8;
    border-radius:4px;
    margin-top:10px;

    input{
        flex:1;
        height:35px;
        margin-top: 8px;
        border:0;
        padding-left:8px;
        background:transparent;

    }

    button{
        width:30px;
        height:35px;
        background:transparent;
        border:0;
    }
}

`


// Conta e Grupo

export const AccountGroup = styled(Segment)``


export const AccountGroupHeader  = styled.div`
 display:flex;
 flex-direction:column;
 align-items:flex-start;


h2{
  font-size: 18px;
  font-family:'Lato';
  color:#192338;
  opacity: 0.5;
  display:flex;
  align-items:center;
  padding-top:10px;
 }

 button{
     width:141px;
     height: 35px;
     border-radius:4px;
     background: #3455AB 0% 0% no-repeat padding-box;
     color:#fff;
     opacity:1;
     border: 1px solid #3455AB;
     font-family: 'Lato';
     font-weight: 600;
 }


`


export const AccountTable = styled(Segment)`

`

export const AccountTableLeft = styled(Segment)`


span{
 font-size:16px;
 color:#ccc;
 font-weight:bold;
 display:block;
 padding-left:16px;
}
`

export const AccountTableRight = styled(Segment)`

span{
 font-size:16px;
 color:#ccc;
 font-weight:bold;
 display:block;
 padding-left:16px;
}


`


// Permissões do Usuário


export const UserPermission = styled(Segment)`
`


export const UserPermissionContent = styled.div`
h2{
    font-size:18px;
     font-family: 'Lato';
     color:#192338;
     padding-top:15px;
 }

 p{
    text-align: left;
    font: normal normal medium 16px  'Lato';
    letter-spacing: 0px;
    color: #192338;
    opacity: 0.5;
 }

 div{
     display:flex;
     flex-direction:row;
     align-items:center;
     justify-content: space-between;

 }
`


export const InputSearch = styled.div`
 display:flex;
 align-items:center;
 justify-content:space-between;
 height:35px;
 border: 1px solid #C8C8C8;
 border-radius:4px;

 input{
     flex: 1;
     border: 0;
     padding-left:16px;

 }

 button{
     height:100%;
     border: 0;
     background:transparent;
     cursor:pointer;
 }

`

export const UserMenus = styled(Segment)`
display:flex;
align-items:center;
justify-content:space-evenly;


.menu{
    text-align:left;
}

strong{
    flex:1;
    text-align:center;
    font-size: 14px;
}
.grey{
    flex:1;
    text-align:center;
    font-size: 14px;
    color:#ccc;
}

div{
    display:flex;
    flex-direction:row;
    align-items:center;
    strong{
        margin-left:8px;
    }
}

`

export const BoxMenus = styled(Segment)`
 display:flex;
 align-items:center;
 justify-content:space-evenly;
 overflow: hidden;

 strong{
     text-align:left;
     width: 100%;
     max-width:220px;
     font-size: 14px;
     color:#192338;
     font-weight:bold;
}

span{
    text-align:left;
     width: 100%;
     max-width:220px;
     font-size: 14px;
     color: #192338;
     position: relative;
     left:10px;
}


 div{
     flex:1;
     display:flex;
     align-items:center;
     justify-content:space-evenly;

     .box3{

         position:relative;
         left: 15px;
     }

     .box4{
         position:relative;
         left: 50px;
     }

     .box5{
         position:relative;
         left: 80px;
     }
 }

 .box43{
    position:relative;
    left: 15px;
}
.box44{
    position:relative;
    left: 50px;
}

.box45{
    position:relative;
    left:80px;
}
`

export const BoxContent = styled(Segment)`
 display:flex;

 display:flex;
 align-items:center;
 justify-content:space-evenly;
 overflow: hidden;

 strong{
     text-align:left;
     width: 100%;
     max-width:220px;
     font-size: 14px;
     color:#192338;
     font-weight:bold;
}

div{
    flex:1;
    display:flex;
    justify-content:space-between;
}

.box13{
    position:relative;
    left: 15px;
}
.box14{
    position:relative;
    left: 50px;
}

.box15{
    position:relative;
    left:80px;
}
`



export const ButtonArea = styled.div`
 position:fixed;
 z-index:999;
 width:100%;
 max-width: 292px;
 bottom: 60px;
 right: 40px;

 display:flex;
 justify-content:space-between;
 height:41px;

 button{
     width:130px;
     height: 41px;
     color:#3455ab;
     display:flex;
     align-items:center;
     justify-content:center;
     background:transparent;
     border-radius: 4px;
     border: 1px solid #3455AB;
     font-size:13px;
     font-weight:bold;
     cursor:pointer;
     & + button{
         color:#fff;
         background:#3455Ab;
         border-radius:4px;

     }

 }
`


