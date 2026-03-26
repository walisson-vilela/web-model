import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./react-B_0iYUWB.js";import{t as r}from"./react-dom-CfS7yHFF.js";import{a as i,i as a,o}from"./styled-components.browser.esm-BYvzgcDz.js";import{r as s}from"./iframe-fSyR9o4x.js";import{n as c,t as l}from"./Loader-CzH8aMET.js";import{n as u,t as d}from"./Button-BLRRkxhG.js";var f,p,m,h=t((()=>{f=e(n(),1),p=e(r(),1),m=e=>{let{id:t,opened:n,children:r}=e,i=document.createElement(`div`);return(0,f.useEffect)(()=>{if(n)return i.id=t+`-root`,document.body.appendChild(i),()=>{document.body.removeChild(i)}},[n]),n?(0,p.createPortal)(r,i):null}})),g,_,v=t((()=>{g={small:`356.4px`,medium:`549px`,large:`600px`,custom:`100%`,default:`356.4px`},_={small:`642.5px`,medium:`1010px`,large:`1095px`,custom:`100%`,default:`642.5px`}})),y,b,x,S,C,w,T,E=t((()=>{a(),v(),y=o.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(3px);
  background-color: ${({theme:e})=>e.getColor(`black`,25)};
`,b=o.div`
  flex: 1;
  position: relative;
  ${({theme:{spacings:e,useTypography:t,colors:n}})=>i`
    padding: ${e.s4};
    color: ${n.darkBlue};
    ${t(`p`)}
  `}
`,x=o.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  ${({theme:{colors:e,spacings:t,useTypography:n}})=>i`
    border-bottom: 1px solid ${e.lightestGrey};
    padding: ${t.s4};

    ${n(`h1`)}
  `}
`,S=o.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${({theme:{spacings:e,colors:t}})=>i`
    border-top: 1px solid ${t.lightestGrey};
    padding: ${e.s3};
  `}
`,C=o.div`
  max-width: 75%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  ${({theme:{useTypography:e,colors:t}})=>i`
    ${e(`p`)}
    color: ${t.darkBlue};
    opacity: 0.75;
  `}
`,w=o.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({theme:e})=>e.spacings.s3};
`,T=o.div`
  display: flex;
  flex-direction: column;
  font-family: ${({theme:e})=>e.fonts.Lato};

  ${({theme:e,$size:t,$customSize:n,$color:r,$inverted:a})=>i`
    background-color: ${e.colors.white};
    box-shadow: 0 0 21px 7px ${e.getColor(`black`,15)};

    width: ${t===`custom`&&n?n.width||`auto`:_[t]};

    height: ${t===`custom`&&n?n.height||`auto`:g[t]};

    ${x} {
      background-color: ${a?e.isDarkColor(r):e.colors[r]};
      color: ${a?e.colors[r]:e.isDarkColor(r)};
    }
  `}
`})),D,O,k,A=t((()=>{D=e(n(),1),h(),u(),c(),v(),E(),O=s(),k=e=>{let{openState:t,title:n,size:r,color:i,inverted:a,children:o,content:s,footer:c,footerMessage:u,loading:f,closeOnEsc:p,closeOnClickOutside:h,customSize:_}=e,[v,E]=t,k=e=>{h&&e.target.parentElement?.id&&E(!1)};(0,D.useEffect)(()=>{let e=e=>{p&&e.key===`Escape`&&(e.preventDefault(),E(!1))};return document.addEventListener(`keydown`,e),()=>{document.removeEventListener(`keydown`,e)}},[]);let A=r?g[r]:g.default;return(0,O.jsx)(m,{opened:v||!1,id:`modal`,children:(0,O.jsx)(y,{onClick:k,children:(0,O.jsxs)(T,{$size:r||`small`,$color:i||`blue`,$inverted:a,$customSize:_,children:[(0,O.jsx)(x,{children:n}),(0,O.jsx)(b,{children:f?(0,O.jsx)(l,{color:`blue`,size:`calc(${A} * 0.1454)`,borderSize:`3px`}):o||s}),(0,O.jsxs)(S,{children:[(0,O.jsx)(C,{children:u&&(typeof u==`string`?(0,O.jsx)(`span`,{children:u}):u)}),(0,O.jsx)(w,{children:c?c.map(({children:e,...t},n)=>(0,O.jsx)(d,{...t,children:e},n)):(0,O.jsx)(d,{content:`OK`,color:i||`blue`,onClick:()=>E(!1)})})]})]})})})},k.__docgenInfo={description:``,methods:[],displayName:`Modal`,props:{title:{required:!1,tsType:{name:`string`},description:`Title on header of modal.`},content:{required:!1,tsType:{name:`string`},description:`Content on center of modal.`},children:{required:!1,tsType:{name:`union`,raw:`string | JSX.Element`,elements:[{name:`string`},{name:`JSX.Element`}]},description:`Content on center of modal.`},inverted:{required:!1,tsType:{name:`boolean`},description:`Define if header of modal is inverted.`},loading:{required:!1,tsType:{name:`boolean`},description:`Define if content of modal is loading.`},footer:{required:!1,tsType:{name:`Array`,elements:[{name:`ButtonProps`}],raw:`ButtonProps[]`},description:`Content on footer of modal.`},footerMessage:{required:!1,tsType:{name:`union`,raw:`string | JSX.Element`,elements:[{name:`string`},{name:`JSX.Element`}]},description:``},openState:{required:!0,tsType:{name:`tuple`,raw:`[boolean, React.Dispatch<React.SetStateAction<boolean>>]`,elements:[{name:`boolean`},{name:`ReactDispatch`,raw:`React.Dispatch<React.SetStateAction<boolean>>`,elements:[{name:`ReactSetStateAction`,raw:`React.SetStateAction<boolean>`,elements:[{name:`boolean`}]}]}]},description:``},closeOnClickOutside:{required:!1,tsType:{name:`boolean`},description:``},closeOnEsc:{required:!1,tsType:{name:`boolean`},description:``},size:{required:!1,tsType:{name:`union`,raw:`'custom' | 'small' | 'medium' | 'large'`,elements:[{name:`literal`,value:`'custom'`},{name:`literal`,value:`'small'`},{name:`literal`,value:`'medium'`},{name:`literal`,value:`'large'`}]},description:`Specifies the modal size.`},customSize:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  width?: string
  height?: string
}`,signature:{properties:[{key:`width`,value:{name:`string`,required:!1}},{key:`height`,value:{name:`string`,required:!1}}]}},description:`Specifies the custom modal size.`},color:{required:!1,tsType:{name:`union`,raw:`keyof typeof colors`,elements:[{name:`literal`,value:`black`},{name:`literal`,value:`blue`},{name:`literal`,value:`bronze`},{name:`literal`,value:`brown`},{name:`literal`,value:`darkBlue`},{name:`literal`,value:`darkestBlue`},{name:`literal`,value:`darkestGreen`},{name:`literal`,value:`darkestGrey`},{name:`literal`,value:`darkGreen`},{name:`literal`,value:`darkGrey`},{name:`literal`,value:`darkSilver`},{name:`literal`,value:`floralWhite`},{name:`literal`,value:`ghostWhite`},{name:`literal`,value:`green`},{name:`literal`,value:`grey`},{name:`literal`,value:`greyishBlue`},{name:`literal`,value:`iceWhite`},{name:`literal`,value:`lightBlue`},{name:`literal`,value:`lightestGrey`},{name:`literal`,value:`lightGreen`},{name:`literal`,value:`lightGrey`},{name:`literal`,value:`milkWhite`},{name:`literal`,value:`orange`},{name:`literal`,value:`pink`},{name:`literal`,value:`purple`},{name:`literal`,value:`red`},{name:`literal`,value:`silver`},{name:`literal`,value:`snowWhite`},{name:`literal`,value:`vanilla`},{name:`literal`,value:`warningGray`},{name:`literal`,value:`warningRed`},{name:`literal`,value:`warningYellow`},{name:`literal`,value:`white`},{name:`literal`,value:`yellow`}]},description:`Define the color of header and default confirm button.`}}}})),j,M=t((()=>{a(),j=o.div`
  padding: ${({theme:e})=>`${e.spacings.s5} ${e.spacings.s4}`};
`})),N,P,F=t((()=>{n(),A(),M(),N=s(),P=e=>{let{cancelAction:t,confirmAction:n,openState:r,content:i,children:a,title:o,closeOnClickOutside:s,closeOnEsc:c}=e;return(0,N.jsx)(k,{title:`Deletar `+o,closeOnClickOutside:s,closeOnEsc:c,openState:r,size:`custom`,customSize:{width:`500px`},color:`greyishBlue`,inverted:!0,footer:[{appearance:`borderless`,content:`Cancelar`,onClick:t},{color:`pink`,content:`Deletar`,onClick:n}],children:(0,N.jsx)(j,{children:a||i})})},P.__docgenInfo={description:``,methods:[],displayName:`ConfirmDelete`,props:{cancelAction:{required:!0,tsType:{name:`ReactMouseEventHandler`,raw:`React.MouseEventHandler<HTMLButtonElement>`,elements:[{name:`HTMLButtonElement`}]},description:``},confirmAction:{required:!0,tsType:{name:`ReactMouseEventHandler`,raw:`React.MouseEventHandler<HTMLButtonElement>`,elements:[{name:`HTMLButtonElement`}]},description:``}},composes:[`Omit`]}})),I,L=t((()=>{a(),I=o.div`
  padding: ${({theme:e})=>`${e.spacings.s5} ${e.spacings.s4}`};
`})),R,z,B=t((()=>{n(),A(),L(),R=s(),z=e=>{let{homeAction:t,cancelAction:n,confirmAction:r,openState:i,content:a,children:o,closeOnClickOutside:s,closeOnEsc:c}=e;return(0,R.jsx)(k,{title:`Confirmação!`,closeOnClickOutside:s,closeOnEsc:c,openState:i,size:`custom`,customSize:{width:`630px`},color:`greyishBlue`,inverted:!0,footer:[{appearance:`bordered`,content:`Ir para Home`,onClick:t},{appearance:`bordered`,content:`Continuar edição`,onClick:n},{content:`Novo Cadastro`,onClick:r}],children:(0,R.jsx)(I,{children:o||a})})},z.__docgenInfo={description:``,methods:[],displayName:`ConfirmSuccess`,props:{homeAction:{required:!0,tsType:{name:`ReactMouseEventHandler`,raw:`React.MouseEventHandler<HTMLButtonElement>`,elements:[{name:`HTMLButtonElement`}]},description:``},cancelAction:{required:!0,tsType:{name:`ReactMouseEventHandler`,raw:`React.MouseEventHandler<HTMLButtonElement>`,elements:[{name:`HTMLButtonElement`}]},description:``},confirmAction:{required:!0,tsType:{name:`ReactMouseEventHandler`,raw:`React.MouseEventHandler<HTMLButtonElement>`,elements:[{name:`HTMLButtonElement`}]},description:``}},composes:[`Omit`]}})),V,H=t((()=>{a(),V=o.div`
  padding: ${({theme:e})=>`${e.spacings.s5} ${e.spacings.s4}`};
`})),U,W,G=t((()=>{n(),A(),H(),U=s(),W=e=>{let{cancelAction:t,confirmAction:n,openState:r,content:i,children:a,closeOnClickOutside:o,closeOnEsc:s}=e;return(0,U.jsx)(k,{title:`Auditoria`,closeOnClickOutside:o,closeOnEsc:s,openState:r,size:`custom`,customSize:{width:`500px`},color:`greyishBlue`,inverted:!0,footer:[{appearance:`borderless`,content:`Cancelar`,onClick:t},{content:`Enviar`,onClick:n}],children:(0,U.jsx)(V,{children:a||i})})},W.__docgenInfo={description:``,methods:[],displayName:`Audit`,props:{cancelAction:{required:!0,tsType:{name:`ReactMouseEventHandler`,raw:`React.MouseEventHandler<HTMLButtonElement>`,elements:[{name:`HTMLButtonElement`}]},description:``},confirmAction:{required:!0,tsType:{name:`ReactMouseEventHandler`,raw:`React.MouseEventHandler<HTMLButtonElement>`,elements:[{name:`HTMLButtonElement`}]},description:``}},composes:[`Omit`]}})),K=t((()=>{F(),B(),G()})),q,J=t((()=>{A(),K(),q=Object.assign(k,{ConfirmDelete:P,ConfirmEdit:z,Audit:W})}));export{J as n,q as t};