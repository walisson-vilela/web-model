import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./react-B_0iYUWB.js";import{a as r,i,n as a,o}from"./styled-components.browser.esm-BYvzgcDz.js";import{r as s}from"./iframe-fSyR9o4x.js";import{n as c,t as l}from"./Input-CNfwAAHR.js";var u,d,f,p=t((()=>{i(),u=o.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;

  ${({$fluid:e})=>e&&r`
      width: 100%;
      display: flex;
    `}

  ${({$transparent:e})=>e&&r`
      input {
        border: none !important;
        background: transparent;
        height: 17px;
        padding-top: 0 !important;
        padding-bottom: 0 !important;
      }
    `}

  ${({$disabled:e})=>e&&r`
      cursor: default;
    `}
`,d=o.input`
  box-sizing: border-box;
  height: 32px;

  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 3px;
  background: #fff;

  font-size: 14px;
  line-height: 17px;
  width: 100%;

  padding: 0 10px;

  outline: none;
  appearance: none;

  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  ${({$hasIcon:e})=>e&&r`
      padding-right: calc(var(--mw-input-icon-size) + 24px) !important;
    `}

  &::placeholder {
    color: #999999 !important;
    opacity: 1;
  }
`,f=o.div`
  position: absolute;
  top: calc(50% - (var(--mw-input-icon-size) / 2));
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    width: var(--mw-input-icon-size);
    height: var(--mw-input-icon-size);
  }
`})),m,h,ee,g=t((()=>{n(),p(),m=s(),h={mini:14.2,small:16,large:19.5,big:21.4,huge:24,massive:28.4},ee=e=>{let{icon:t,loading:n,fluid:r,transparent:i,size:a,disabled:o,style:s,...c}={...e},l=a?h[a]:h.small;return(0,m.jsxs)(u,{$fluid:r,$transparent:i,$disabled:o||n,style:{...s||{},"--mw-input-icon-size":`${l}px`},children:[(0,m.jsx)(d,{...c,disabled:o||n,$hasIcon:!!t}),t&&(0,m.jsx)(f,{children:t})]})},ee.__docgenInfo={description:``,methods:[],displayName:`Input`,props:{icon:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},loading:{required:!1,tsType:{name:`boolean`},description:``},fluid:{required:!1,tsType:{name:`boolean`},description:``},transparent:{required:!1,tsType:{name:`boolean`},description:``},size:{required:!1,tsType:{name:`union`,raw:`'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive'`,elements:[{name:`literal`,value:`'mini'`},{name:`literal`,value:`'small'`},{name:`literal`,value:`'large'`},{name:`literal`,value:`'big'`},{name:`literal`,value:`'huge'`},{name:`literal`,value:`'massive'`}]},description:``}},composes:[`Omit`]}})),_,v,y,b,x=t((()=>{i(),g(),_={disabled:r`
    color: #999999 !important;
    cursor: auto !important;
    svg {
      color: #999999;
    }
  `,opacity:r`
    color: #999999 !important;
  `},v=o.button`
  cursor: pointer;

  user-select: none;

  width: 100%;
  background-color: transparent;
  border: none;
  text-align: inherit;
  padding: 0;

  ${({$appearance:e})=>{if(e&&Object.prototype.hasOwnProperty.call(_,e))return _[e]}}

  ${({$occult:e})=>e?r`
      visibility: hidden;
    `:r``}

  &:disabled {
    ${_.disabled}
  }
`,y=o.div`
  font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
  }

  i,
  i.icon,
  i.icons {
    margin-right: 0;
  }

  svg {
    color: #999999;
  }
`,b=r`
  scroll-behavior: smooth;
  @supports not selector(::-webkit-scrollbar) {
    scrollbar-color: #adadad #f9f8f8;
    scrollbar-width: thin;
  }
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    background: #adadad;
  }
  &::-webkit-scrollbar-track {
    background: #f9f8f8;
  }
`})),S,C,te,ne,w=t((()=>{i(),S=o.div`
  position: relative;
  box-sizing: border-box;

  background-color: #fff !important;
  border-style: solid;
  border-color: #e2e2e3;

  font-size: 14px;
  line-height: 17px;
`,C=o.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  background-color: #fff !important;
  border-width: 1px 1px 0 1px;
  border-style: solid;
  border-color: #e2e2e3;
  color: #999999;

  & > div {
    display: flex;
  }

  @media (max-width: 900px) {
    flex-direction: column;
  }
`,te=o.div`
  background-color: #fff !important;

  ${S} {
    border-width: 0 1px 0 0;
    padding: 0 14px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 900px) {
    width: 100%;
    justify-content: center;
    ${S}:last-child {
      border-width: 0 0 0 0;
    }
  }
`,ne=o.div`
  background-color: #fff !important;

  ${S} {
    border-width: 0 0 0 1px;
    padding: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 900px) {
    width: 100%;
    justify-content: center;

    ${S}:first-child {
      border-width: 0 0 0 0;
    }
  }
`})),re,T,E,ie=t((()=>{re=e(n(),1),x(),w(),T=s(),E=e=>{let{left:t,right:n}=e,r=e=>e?Array.isArray(e)?e.map((e,t)=>(0,T.jsx)(S,{children:e},t)):(0,T.jsx)(S,{children:e}):(0,T.jsx)(re.Fragment,{});return(0,T.jsx)(y,{children:(0,T.jsxs)(C,{children:[(0,T.jsx)(te,{children:t&&r(t)}),(0,T.jsx)(ne,{children:n&&r(n)})]})})},E.__docgenInfo={description:``,methods:[],displayName:`BlankToolbar`,props:{left:{required:!1,tsType:{name:`union`,raw:`React.ReactElement | React.ReactElement[]`,elements:[{name:`ReactReactElement`,raw:`React.ReactElement`},{name:`Array`,elements:[{name:`ReactReactElement`,raw:`React.ReactElement`}],raw:`React.ReactElement[]`}]},description:`conteudo diverso que sera exibido na parte direita da barra de ferramentas`},right:{required:!1,tsType:{name:`union`,raw:`React.ReactElement | React.ReactElement[]`,elements:[{name:`ReactReactElement`,raw:`React.ReactElement`},{name:`Array`,elements:[{name:`ReactReactElement`,raw:`React.ReactElement`}],raw:`React.ReactElement[]`}]},description:`conteudo diverso que sera exibido na parte esquerda da barra de ferramentas`}}}})),ae,D,oe,se,ce=t((()=>{i(),ae=o.div`
  position: relative;
  display: inline-flex;
`,D={large:600,medium:400,small:200},oe={top:e=>r`
    bottom: calc(100% + 7px);
    left: 50%;
    transform: translateX(-50%);

    &:after {
      bottom: -${e/2}px;
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
    }
  `,left:e=>r`
    right: calc(100% + 7px);
    top: 50%;
    transform: translateY(-50%);

    &:after {
      top: 50%;
      right: -${e/2}px;
      transform: translateY(-50%) rotate(45deg);
    }
  `,bottom:e=>r`
    top: calc(100% + 7px);
    left: 50%;
    transform: translateX(-50%);

    &:after {
      top: -${e/2}px;
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
    }
  `,right:e=>r`
    left: calc(100% + 7px);
    top: 50%;
    transform: translateY(-50%);

    &:after {
      top: 50%;
      left: -${e/2}px;
      transform: translateY(-50%) rotate(45deg);
    }
  `},se=o.div`
  position: absolute;
  padding: 12px 14px;
  border-radius: 4px;
  text-align: center;
  white-space: normal;
  overflow-wrap: break-word;

  background-color: #1b1c1d;
  color: #fff;

  z-index: 99;

  ${({$width:e,$position:t})=>{let n=e||`small`,i=t||`bottom`,a=D[n];return r`
      ${oe[i](7)}
      width: max-content;
      max-width: ${a}px;
    `}}

  &:after {
    content: '';
    width: 7px;
    height: 7px;
    position: absolute;
    background-color: #1b1c1d;
  }
`})),O,le,k,ue=t((()=>{O=e(n(),1),ce(),le=s(),k=e=>{let{children:t,message:n,on:r,disabled:i,width:a,position:o}={...e},[s,c]=(0,O.useState)(!1),l=(0,O.useRef)(null),u=()=>{},d=()=>{},f=()=>{},p=()=>{i||c(!0)},m=()=>{c(!1)},h=e=>{if(!l||!l.current||!document.body.contains(l.current))return;let t=e.target;l.current.contains(t)||c(!1)};return r===`click`?u=p:r===`hover`&&(d=p,f=m),(0,O.useEffect)(()=>{c(!1)},[r]),(0,O.useEffect)(()=>{i&&c(!1)},[i]),(0,O.useEffect)(()=>(document.addEventListener(`mousedown`,h),()=>{document.removeEventListener(`mousedown`,h)}),[]),(0,le.jsxs)(ae,{onClick:u,onMouseOver:d,onMouseOut:f,ref:l,children:[t,s&&!i&&(0,le.jsx)(se,{$width:a,$position:o,children:n})]})},k.__docgenInfo={description:``,methods:[],displayName:`Tooltip`,props:{children:{required:!0,tsType:{name:`JSX.Element`},description:`elemento que tera a tooltip`},message:{required:!0,tsType:{name:`union`,raw:`JSX.Element | string`,elements:[{name:`JSX.Element`},{name:`string`}]},description:`mensagem da tooltip`},on:{required:!0,tsType:{name:`union`,raw:`'click' | 'hover'`,elements:[{name:`literal`,value:`'click'`},{name:`literal`,value:`'hover'`}]},description:`evento que ira mostrar a tooltip`},disabled:{required:!1,tsType:{name:`boolean`},description:`estado que habilita ou desabilita a tooltip`},width:{required:!1,tsType:{name:`union`,raw:`'large' | 'medium' | 'small'`,elements:[{name:`literal`,value:`'large'`},{name:`literal`,value:`'medium'`},{name:`literal`,value:`'small'`}]},description:`largura da tooltip`},position:{required:!1,tsType:{name:`union`,raw:`'top' | 'left' | 'bottom' | 'right'`,elements:[{name:`literal`,value:`'top'`},{name:`literal`,value:`'left'`},{name:`literal`,value:`'bottom'`},{name:`literal`,value:`'right'`}]},description:`posicao da tooltip`}}}})),A,de,fe=t((()=>{n(),A=s(),de=e=>(0,A.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:4,height:17,viewBox:`14 14 5 6`,...e,children:[(0,A.jsx)(`defs`,{children:(0,A.jsx)(`clipPath`,{id:`dropdown_svg__a`,children:(0,A.jsx)(`path`,{d:`M0 0h32.5v34.3H0z`})})}),(0,A.jsxs)(`g`,{clipPath:`url(#dropdown_svg__a)`,"data-name":`Icones Menu`,children:[(0,A.jsx)(`g`,{"data-name":`Grupo 1`,children:(0,A.jsx)(`path`,{fill:`none`,d:`M1 1h24v24H1Z`,"data-name":`Caminho 3277`})}),(0,A.jsx)(`path`,{fill:`rgba(38,48,70,0.5)`,d:`M18.496 17.129a2.248 2.248 0 1 1-.171-.861 2.3 2.3 0 0 1 .171.861m0 7.877a2.248 2.248 0 1 1-.171-.861 2.3 2.3 0 0 1 .171.861m0-15.755a2.248 2.248 0 1 1-.171-.861 2.3 2.3 0 0 1 .171.861`})]})]}),de.__docgenInfo={description:``,methods:[],displayName:`SvgDropdown`}})),pe,me,he=t((()=>{pe=e(n(),1),me=(0,pe.createContext)({items:[],setOpen:()=>{},open:!1,position:`left bottom`})})),ge,_e,ve,ye,be,xe,Se=t((()=>{i(),x(),ge={"top left":r`
    right: 0;
    bottom: 100%;
  `,"top right":r`
    left: 0;
    bottom: 100%;
  `,"left top":r`
    right: 100%;
    bottom: 0;
  `,"left bottom":r`
    right: 100%;
    top: 0;
  `,"bottom left":r`
    right: 0;
    top: 100%;
  `,"bottom right":r`
    left: 0;
    top: 100%;
  `,"right top":r`
    left: 100%;
    bottom: 0;
  `,"right bottom":r`
    left: 100%;
    top: 0;
  `},_e=o.div`
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(34, 36, 38, 0.15);
  padding: 7px 0;

  display: flex;
  flex-direction: column;
  align-items: stretch;

  transition-property: max-height, opacity;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;
`,ve=o.div`
  position: absolute;
  z-index: 2;
  background-color: #fff;
  width: max-content;

  transition-property: max-height, opacity;
  transition-duration: 0.25s;
  transition-timing-function: ease-in-out;

  box-shadow: 0 2px 4px 0 rgba(34, 36, 38, 0.12),
    0 2px 10px 0 rgba(34, 36, 38, 0.15) !important;

  ${({$open:e})=>{let[t,n]=e?[`500px`,`1`]:[`0px`,`0`];return r`
      opacity: ${n};
      max-height: ${t};

      ${_e} {
        opacity: ${n};
        max-height: ${t};
      }
    `}};

  overflow: hidden;

  ${({$position:e})=>e&&ge[e]}
`,ye=o(v)`
  padding: 7px 14px;
  color: ${({$tone:e})=>e===`danger`?`#db2828`:`#222426`};
`,be=o.div`
  width: 100%;
`,xe=o.hr`
  margin: 7px 0;
  border-style: solid;
  border-color: #dadadb;
  border-width: 1px 0 0 0;
`})),Ce,j,we,Te,Ee=t((()=>{Ce=e(n(),1),ue(),he(),Se(),j=s(),we=(e,t,n,r=!0)=>{for(let t=0;t<e.length;t++){let{rule:n,message:r}={...e[t]};if(!n())return{message:r,appearance:`disabled`,disabled:!1,onClickFunc:()=>{}}}return{message:``,disabled:!0,onClickFunc:e=>{t(e),r&&n(!1)}}},Te=()=>{let{items:e,open:t,position:n,setOpen:r}={...(0,Ce.useContext)(me)};return(0,j.jsx)(ve,{$open:t,$position:n,children:(0,j.jsx)(_e,{children:e.map((e,t)=>{let{content:n,onClick:i,rules:a,border:o,closeOnClick:s,tone:c}={...e},{message:l,appearance:u,disabled:d,onClickFunc:f}=we(a,i,r,s);return(0,j.jsxs)(Ce.Fragment,{children:[o&&(0,j.jsx)(xe,{}),(0,j.jsx)(be,{children:(0,j.jsx)(k,{on:`hover`,message:l,disabled:d,children:(0,j.jsx)(`div`,{children:(0,j.jsx)(ye,{type:`button`,onClick:f,$appearance:u,$tone:c,children:n})})})})]},t)})})})},Te.__docgenInfo={description:``,methods:[],displayName:`List`}})),De,M,Oe,ke,Ae=t((()=>{De=e(n(),1),x(),ue(),fe(),Ee(),he(),M=s(),Oe={x:(e,t)=>`${e} ${t}`,y:(e,t)=>`${t} ${e}`},ke=e=>{let{items:t,loading:n,axis:r,occult:i,children:a,disabled:o}={...e},s=e.centerCoodinates?{x:e.centerCoodinates.x||50,y:e.centerCoodinates.y||75}:{x:50,y:75},[c,l]=(0,De.useState)(!1),[u,d]=(0,De.useState)(`left bottom`),f=(0,De.useRef)(null),p=e=>{if(!f||!f.current||!document.body.contains(f.current))return;let t=e.target;f.current.contains(t)||l(!1)};(0,De.useEffect)(()=>(document.addEventListener(`mousedown`,p),()=>{document.removeEventListener(`mousedown`,p)}),[]);let m=e=>{if(!c){let t=e.target,n=window.innerWidth,i=window.innerHeight,{top:a,left:o}=t.getBoundingClientRect(),c=o*100/n,l=a*100/i,u=c>s.x?`left`:`right`,f=l>s.y?`top`:`bottom`,p=Oe[r];d(p(u,f))}l(e=>!e)};return(0,M.jsxs)(y,{ref:f,children:[(()=>{let t={type:`button`,onClick:m,disabled:n,$appearance:c?void 0:`opacity`,$occult:i,style:{display:`flex`,alignItems:`center`,justifyContent:`center`,...e.notAbsolute?{}:{position:`absolute`,top:0,left:0,height:`100%`}},children:a||(0,M.jsx)(de,{})};return o===void 0||o===!1||(t.$appearance=`disabled`,o===!0)?(0,M.jsx)(v,{...t}):(0,M.jsx)(k,{on:`click`,message:o.content,children:(0,M.jsx)(v,{...t})})})(),(0,M.jsx)(me.Provider,{value:{items:t,open:c,setOpen:l,position:u},children:(0,M.jsx)(Te,{})})]})},ke.__docgenInfo={description:``,methods:[],displayName:`Dropdown`,props:{items:{required:!0,tsType:{name:`Array`,elements:[{name:`Item`}],raw:`Item[]`},description:`lista de botoes que serao exibidos no dropdown`},loading:{required:!0,tsType:{name:`boolean`},description:`indicador de loading ativo`},axis:{required:!0,tsType:{name:`union`,raw:`'x' | 'y'`,elements:[{name:`literal`,value:`'x'`},{name:`literal`,value:`'y'`}]},description:`eixo que o dropdown deve abrir`},centerCoodinates:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  x?: number
  y?: number
}`,signature:{properties:[{key:`x`,value:{name:`number`,required:!1}},{key:`y`,value:{name:`number`,required:!1}}]}},description:``},occult:{required:!1,tsType:{name:`boolean`},description:``},children:{required:!1,tsType:{name:`union`,raw:`string | JSX.Element | (string | JSX.Element)[]`,elements:[{name:`string`},{name:`JSX.Element`},{name:`Array`,elements:[{name:`unknown`}],raw:`(string | JSX.Element)[]`}]},description:``},disabled:{required:!1,tsType:{name:`union`,raw:`| boolean
| {
    content: string | JSX.Element
    inverted?: boolean
    position?:
      | 'top left'
      | 'top right'
      | 'bottom left'
      | 'bottom right'
      | 'right center'
      | 'left center'
      | 'top center'
      | 'bottom center'
  }`,elements:[{name:`boolean`},{name:`signature`,type:`object`,raw:`{
  content: string | JSX.Element
  inverted?: boolean
  position?:
    | 'top left'
    | 'top right'
    | 'bottom left'
    | 'bottom right'
    | 'right center'
    | 'left center'
    | 'top center'
    | 'bottom center'
}`,signature:{properties:[{key:`content`,value:{name:`union`,raw:`string | JSX.Element`,elements:[{name:`string`},{name:`JSX.Element`}],required:!0}},{key:`inverted`,value:{name:`boolean`,required:!1}},{key:`position`,value:{name:`union`,raw:`| 'top left'
| 'top right'
| 'bottom left'
| 'bottom right'
| 'right center'
| 'left center'
| 'top center'
| 'bottom center'`,elements:[{name:`literal`,value:`'top left'`},{name:`literal`,value:`'top right'`},{name:`literal`,value:`'bottom left'`},{name:`literal`,value:`'bottom right'`},{name:`literal`,value:`'right center'`},{name:`literal`,value:`'left center'`},{name:`literal`,value:`'top center'`},{name:`literal`,value:`'bottom center'`}],required:!1}}]}}]},description:``},notAbsolute:{required:!1,tsType:{name:`literal`,value:`true`},description:``}}}})),je,Me=t((()=>{i(),je=o.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`})),Ne,N,P=t((()=>{n(),Me(),Ne=s(),N=e=>{let t={...e},n=t.onMouseOver||(()=>{});return t.onMouseOver=e=>{n(e);let t=e.target;for(;t&&!Object.prototype.hasOwnProperty.call(t.dataset,`ellipsis`);)t=t.parentElement;t&&(t.scrollWidth>t.offsetWidth?t.title=t.innerText:t.removeAttribute(`title`))},(0,Ne.jsx)(je,{...t,"data-ellipsis":``})},N.__docgenInfo={description:``,methods:[],displayName:`EllipsisContainer`}})),Pe,Fe,Ie=t((()=>{i(),Pe=o.div`
  height: 100vh;
  background: #f9fafb;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
`,Fe=o.div`
  width: 100%;
  min-width: 0;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 0.5px solid #e7e7e9;
  background: #fff;
  overflow: hidden;
`})),Le,Re,ze=t((()=>{Ie(),Le=s(),Re=e=>{let{children:t,className:n}=e;return(0,Le.jsx)(Pe,{className:n,children:(0,Le.jsx)(Fe,{children:t})})},Re.__docgenInfo={description:``,methods:[],displayName:`Frame`,props:{children:{required:!0,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},className:{required:!1,tsType:{name:`string`},description:``}}}})),Be,Ve,He=t((()=>{Be=(e,t)=>document.evaluate(e,t,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,Ve=e=>Object.prototype.toString.call(e)===`[object Object]`})),Ue,F,I=t((()=>{Ue=e(n(),1),F=(0,Ue.createContext)({columns:[],rows:[],hasFilters:!1,messages:{empty:``,emptyWithFilters:``},sort:{sort:null,setSort:()=>{}},loading:!1,paginator:()=>{},getRowDisabled:()=>!1})})),We,Ge,Ke,qe,Je,Ye,Xe,Ze=t((()=>{i(),We=e=>{let t=Math.max(1,Math.min(16,e||1));return`${t} ${t} 0`},Ge=e=>e===`center`?`center`:e===`right`?`flex-end`:`flex-start`,Ke=o.td`
  display: flex;
  align-items: ${({$verticalalignment:e})=>e||`center`};
  justify-content: ${({$textAlign:e})=>Ge(e)};
  position: relative;

  padding: 0 12px;
  min-height: 45px;
  font-size: 14px;
  line-height: 17px;
  color: #263046;
  min-width: 0;

  flex: ${({$width:e})=>We(e)};

  ${({$pointer:e})=>e&&r`
      cursor: pointer;
    `}
`,qe=o(Ke)`
  flex: 0 0 42px;
  justify-content: center;
  padding: 0;
`,Je=o(Ke)`
  flex: 0 0 42px;
  padding: 0;
  justify-content: center;
`,Ye=o.div`
  position: relative;
  width: 22px;
`,Xe=o.tr`
  border-top: 1px solid #e2e2e3;
  display: flex;
  align-items: stretch;
  width: 100%;
  box-sizing: border-box;

  ${({$stripped:e})=>{if(e)return r`
      &&:nth-child(even) {
        background-color: #fafafb;
      }
    `}}

  td {
    border: 0;
  }
`})),Qe,L,$e,et=t((()=>{Qe=e(n(),1),c(),He(),Ae(),P(),I(),Ze(),L=s(),$e=e=>{let{row:t,index:n}={...e},{columns:r,checkeds:i,getItemMenu:a,loading:o,centerCoodinates:s,itemMenuVerticalAlign:c,getRowDisabled:u,list:d,onClickColumn:f}={...(0,Qe.useContext)(F)},[p]=d?[void 0]:[!0],m=[...[...r].slice(0,1)].map(e=>({...e}));r.slice(1).forEach(e=>{if(!Ve(t[e.key])||!(`merged`in t[e.key])||!t[e.key].merged)m.push({...e});else{let t=m[m.length-1].width;if(t!==void 0&&e.width!==void 0){let n=t+e.width;m[m.length-1].width=n}}});let h=u(t);return(0,L.jsxs)(Xe,{$stripped:p,children:[i&&(0,L.jsx)(qe,{$verticalalignment:i.verticalAlign,children:(0,L.jsx)(l,{type:i.asRadio?`radio`:`checkbox`,onChange:e=>{i.setCheckeds(n=>{let r=n.filter(e=>JSON.stringify(e)!==JSON.stringify(t));return e.target.checked?[...r,t]:r})},checked:i.checkeds.map(e=>JSON.stringify(e)).includes(JSON.stringify(t))})}),m.map((e,r)=>{let i=t[e.key]||t[e.key]===0?t[e.key]:`-`;return(0,L.jsx)(Ke,{$textAlign:e.textAlign,$width:e.width,$verticalalignment:e.verticalAlign,...f&&!h?{onClick:i=>f([t,n],[e,r],i),$pointer:!0}:{},children:e.ellipsis===!1?i:(0,L.jsx)(N,{children:i})},r)}),(()=>{if(!a)return;let e=a(t);return(0,L.jsx)(Je,{$verticalalignment:c,children:(0,L.jsx)(Ye,{children:(()=>{let t={loading:o,axis:`y`,centerCoodinates:s||{y:85}};return Array.isArray(e)?(0,L.jsx)(ke,{...t,items:e,notAbsolute:!0,occult:e.length===0}):(0,L.jsx)(ke,{...t,items:[],notAbsolute:!0,disabled:e===!1?!0:{position:`left center`,inverted:!0,content:e}})})()})})})()]})},$e.__docgenInfo={description:``,methods:[],displayName:`TableRow`,props:{row:{required:!0,tsType:{name:`any`},description:`conteudo da linha`},index:{required:!0,tsType:{name:`number`},description:``}}}})),tt,nt,rt,it,at,ot,st,ct=t((()=>{i(),x(),tt=o.tbody`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;

  ${b}
`,nt=o.td`
  height: 100%;
  width: 100%;
  color: #b2b2b2;
  padding-top: 112px;
  font-size: 16px;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex: 1 1 auto;
`,rt=o.tr`
  display: flex;
  height: 100%;
  width: 100%;
`,it=o.tr`
  display: flex;
  width: 100%;
`,at=o.td`
  padding: 0;
  flex: 1 1 auto;
  display: flex;
  position: relative;
`,ot=o.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;

  height: ${({$height:e})=>e?`${e}px`:`100%`};

  z-index: 98;
`,st=o.div`
  width: 32px;
  height: 32px;
  border-radius: 999px;
  border: 3px solid #e6e6e6;
  border-top-color: #3455ab;
  animation: mw_manager_spin 0.8s linear infinite;
  margin: 24px auto;

  @keyframes mw_manager_spin {
    to {
      transform: rotate(360deg);
    }
  }
`})),R,z,lt,ut,dt,ft=t((()=>{R=e(n(),1),et(),I(),ct(),z=s(),lt=e=>(0,z.jsx)(rt,{children:(0,z.jsx)(nt,{children:e.children})}),ut=()=>{let[e,t]=(0,R.useState)(null),n=(0,R.useRef)(null);return(0,R.useEffect)(()=>{let e=null;if(n&&n.current){let t=n.current.parentElement;t.offsetHeight>0&&(e=t.offsetHeight)}t(e)},[n]),(0,z.jsx)(it,{ref:n,children:(0,z.jsx)(at,{children:(0,z.jsx)(ot,{$height:e,children:(0,z.jsx)(st,{"aria-label":`Carregando`})})})})},dt=()=>{let[e,t]=(0,R.useState)(new Date),{rows:n,hasFilters:r,messages:i,loading:a,paginator:o}={...(0,R.useContext)(F)};return(0,z.jsxs)(tt,{onScroll:n=>{if(n.target!==n.currentTarget)return;let r=n.nativeEvent.target,i=r.scrollHeight-r.getBoundingClientRect().height-10,a=r.scrollTop;if(i>0&&a>=i){if(Math.abs((new Date().getTime()-e.getTime())/1e3)<.5)return;t(new Date),o()}},children:[(()=>{if(n.length>0)return n.map((e,t)=>(0,z.jsx)($e,{row:e,index:t},t));let e=i[r?`emptyWithFilters`:`empty`];return(0,z.jsx)(lt,{children:e})})(),a&&(0,z.jsx)(ut,{})]})},dt.__docgenInfo={description:``,methods:[],displayName:`TableBody`}})),pt,mt,ht=t((()=>{i(),x(),pt=o.svg`
  width: 16px;
  height: 16px;
  flex: 0 0 auto;
`,mt=o(v)`
  display: flex;
  width: unset;
  max-width: 100%;
  position: relative;
  color: inherit;
  font-weight: bold;
  line-height: inherit;
  gap: 6px;
  padding-right: 0;
  font-size: 14px;
  line-height: 17px;
`})),gt,B,_t,vt,yt,bt=t((()=>{gt=e(n(),1),P(),I(),ht(),B=s(),_t={ASC:`DESC`,DESC:null,null:`ASC`},vt=e=>{let{direction:t}=e,n=`#3455AB`,r=`#b2b2b2`,i=t===`ASC`?n:r,a=t===`DESC`?n:r;return(0,B.jsxs)(pt,{"aria-hidden":`true`,viewBox:`0 0 12 12`,children:[(0,B.jsx)(`path`,{d:`M6 2l3 3H3l3-3z`,fill:i}),(0,B.jsx)(`path`,{d:`M6 10l-3-3h6l-3 3z`,fill:a})]})},yt=e=>{let{fieldKey:t,children:n}={...e},{sort:{sort:r,setSort:i},loading:a}=(0,gt.useContext)(F),o=()=>{let e={sort:t,direction:`ASC`};if(r&&r.sort===t){let t=_t[r.direction];t===null?e=null:e.direction=t}i(e)},s=r&&r.sort===t?r.direction:null;return(0,B.jsxs)(mt,{onClick:o,disabled:a,children:[(0,B.jsx)(N,{children:n}),(0,B.jsx)(vt,{direction:s})]})},yt.__docgenInfo={description:``,methods:[],displayName:`Sort`,props:{fieldKey:{required:!0,tsType:{name:`string`},description:`chave da ordenacao`},children:{required:!0,tsType:{name:`union`,raw:`JSX.Element | string`,elements:[{name:`JSX.Element`},{name:`string`}]},description:`conteudo html ou string da coluna`}}}})),xt,St,Ct,wt,Tt,Et,Dt=t((()=>{i(),xt=e=>{let t=Math.max(1,Math.min(16,e||1));return`${t} ${t} 0`},St=e=>e===`center`?`center`:e===`right`?`flex-end`:`flex-start`,Ct=o.tr`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  background-color: ${({$bgcolor:e})=>e||`#f9fafb`} !important;
  border-bottom: 1px solid #e2e2e3;
  padding-right: 2px;

  @supports selector(::-webkit-scrollbar) {
    padding-right: 9px;
  }
`,wt=o.th`
  overflow: hidden;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: ${({$textAlign:e})=>St(e)};
  background-color: ${({$bgcolor:e})=>e||`#f9fafb`} !important;
  color: ${({$color:e})=>e||`#263046`} !important;
  min-height: 45px;
  font-size: 14px;
  line-height: 17px;
  padding: 0 12px;
  min-width: 0;

  flex: ${({$width:e})=>xt(e)};

  ${({$borderless:e})=>{if(e)return r`
      border-bottom: none;
    `}};
`,Tt=o(wt)`
  flex: 0 0 42px;
  justify-content: center;
  padding: 0;
`,Et=o(wt)`
  flex: 0 0 42px;
  justify-content: center;
  padding: 0;
`})),Ot,V,kt,At=t((()=>{Ot=e(n(),1),c(),P(),bt(),I(),Dt(),V=s(),kt=()=>{let{columns:e,checkeds:t,rows:n,getItemMenu:r,list:i,borderless:a}=(0,Ot.useContext)(F),o=e=>e.sortKey?(0,V.jsx)(yt,{fieldKey:e.sortKey,children:e.content}):(0,V.jsx)(N,{children:e.content}),s=i?`#FFF`:void 0;return(0,V.jsx)(`thead`,{children:(0,V.jsxs)(Ct,{$bgcolor:s,children:[t&&(0,V.jsx)(Tt,{$bgcolor:s,$borderless:a,children:t.hideCheckAll?(0,V.jsx)(`div`,{style:{width:17,height:17}}):(0,V.jsx)(l,{type:`checkbox`,onChange:e=>{t.setCheckeds(e.target.checked?n:[])},checked:t.checkeds.length===n.length&&n.length>0})}),e.map((e,t)=>(0,V.jsx)(wt,{$textAlign:e.textAlign,$width:e.width,$bgcolor:s,$borderless:a,children:o(e)},t)),r&&(0,V.jsx)(Et,{$bgcolor:s,$borderless:a})]})})},kt.__docgenInfo={description:`Componente responsável pelo cabeçalho da tabela

@param props
@constructor`,methods:[],displayName:`TableHeader`}})),jt,Mt,Nt=t((()=>{i(),x(),jt=o.table`
  margin: 0;
  border-collapse: collapse;
  box-sizing: border-box;

  width: 100%;
  height: 100%;
  min-height: 0;

  border: 1px solid #e2e2e3;
  background-color: #fff;

  overflow: hidden;
  display: flex;
  flex-direction: column;

  position: relative;
  border-radius: 0;

  thead {
    flex: 0 0 auto;
    display: block;
  }

  tbody {
    flex: 1 1 auto;
    display: block;
    min-height: 0;
  }
`,Mt=o(y)`
  flex: 1;
  height: 100%;
  min-height: 0;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  ${jt} {
    ${({$borderless:e})=>{if(e)return r`
        border: none;
      `}}
  }
`})),H,U,Pt,Ft,It=t((()=>{H=e(n(),1),ft(),At(),I(),Nt(),U=s(),Pt={empty:`Nenhum resultado encontrado`,emptyWithFilters:`Nenhum resultado encontrado para a busca realizada`},Ft=e=>{let{columns:t,rows:n,hasFilters:r,loading:i,page:a,resetKey:o,checkeds:s,getItemMenu:c,itemMenuVerticalAlign:l,centerCoodinates:u,getRowDisabled:d,headerless:f,keepCheckeds:p,list:m,borderless:h,onClickColumn:ee}={...e},{sort:g,setSort:_}=e.sort?e.sort:{sort:null,setSort:()=>{}},v=e.setPage||(()=>{}),y=e.paginator||(()=>{}),b={...Pt,...e.messages||{}},x=(0,H.useRef)(null),S=(0,H.useRef)(o),C=e=>e.getElementsByTagName(`table`)[0].tBodies[0];return(0,H.useEffect)(()=>{if(!(!s||p)){if(S.current!==o||a===1)s.setCheckeds([]);else{let e=n.map(e=>JSON.stringify(e));s.setCheckeds(t=>t.filter(t=>e.includes(JSON.stringify(t))))}S.current=o}},[n,o,a]),(0,H.useEffect)(()=>{if(a===1&&x&&x.current){let e=C(x.current);e.scrollTop=0}},[a]),(0,H.useEffect)(()=>{if(o!==void 0&&x&&x.current){let e=C(x.current);e.scrollTop=0}},[o]),(0,U.jsx)(Mt,{ref:x,$borderless:h,children:(0,U.jsx)(F.Provider,{value:{columns:t,rows:n,hasFilters:r,messages:b,sort:{sort:g,setSort:e=>{_(e),v(1)}},loading:i,paginator:y,checkeds:s,getItemMenu:c,itemMenuVerticalAlign:l,centerCoodinates:u,getRowDisabled:d||(()=>!1),headerless:f,list:m,borderless:h,onClickColumn:ee},children:(0,U.jsxs)(jt,{children:[!f&&(0,U.jsx)(kt,{}),(0,U.jsx)(dt,{})]})})})},Ft.__docgenInfo={description:``,methods:[],displayName:`Manager`,props:{columns:{required:!0,tsType:{name:`Array`,elements:[{name:`ColumnInterface`}],raw:`ColumnInterface[]`},description:`lista de configuracao das colunas`},rows:{required:!0,tsType:{name:`Array`,elements:[{name:`any`}],raw:`Row[]`},description:`lista de linhas`},hasFilters:{required:!0,tsType:{name:`boolean`},description:`indicador de filtros aplicados`},loading:{required:!0,tsType:{name:`boolean`},description:`indicador de loading ativo`},checkeds:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  /** estado que contem as linhas que estao selecionadas */
  checkeds: Row[]
  /** funcao para alterar o estado dos itens selecionados */
  setCheckeds: React.Dispatch<React.SetStateAction<Row[]>>
  /** alinhamento vertical da coluna do checkbox */
  verticalAlign?: VerticalAligns
  /** se o checkbox de marcar todos deve ser escondido */
  hideCheckAll?: boolean
  /** se o checkbox deve ter aparencia de radio */
  asRadio?: boolean
}`,signature:{properties:[{key:`checkeds`,value:{name:`Array`,elements:[{name:`any`}],raw:`Row[]`,required:!0},description:`estado que contem as linhas que estao selecionadas`},{key:`setCheckeds`,value:{name:`ReactDispatch`,raw:`React.Dispatch<React.SetStateAction<Row[]>>`,elements:[{name:`ReactSetStateAction`,raw:`React.SetStateAction<Row[]>`,elements:[{name:`Array`,elements:[{name:`any`}],raw:`Row[]`}]}],required:!0},description:`funcao para alterar o estado dos itens selecionados`},{key:`verticalAlign`,value:{name:`union`,raw:`| 'baseline'
| 'center'
| 'end'
| 'first baseline'
| 'flex-end'
| 'flex-start'
| 'last baseline'
| 'left'
| 'right'
| 'safe'
| 'space-around'
| 'space-between'
| 'space-evenly'
| 'start'
| 'stretch'
| 'unsafe'
| 'inherit'
| 'initial'
| 'unset'`,elements:[{name:`literal`,value:`'baseline'`},{name:`literal`,value:`'center'`},{name:`literal`,value:`'end'`},{name:`literal`,value:`'first baseline'`},{name:`literal`,value:`'flex-end'`},{name:`literal`,value:`'flex-start'`},{name:`literal`,value:`'last baseline'`},{name:`literal`,value:`'left'`},{name:`literal`,value:`'right'`},{name:`literal`,value:`'safe'`},{name:`literal`,value:`'space-around'`},{name:`literal`,value:`'space-between'`},{name:`literal`,value:`'space-evenly'`},{name:`literal`,value:`'start'`},{name:`literal`,value:`'stretch'`},{name:`literal`,value:`'unsafe'`},{name:`literal`,value:`'inherit'`},{name:`literal`,value:`'initial'`},{name:`literal`,value:`'unset'`}],required:!1},description:`alinhamento vertical da coluna do checkbox`},{key:`hideCheckAll`,value:{name:`boolean`,required:!1},description:`se o checkbox de marcar todos deve ser escondido`},{key:`asRadio`,value:{name:`boolean`,required:!1},description:`se o checkbox deve ter aparencia de radio`}]}},description:`objeto com o estado e a funcao para alterar o estado dos itens selecionados,
caso nao seja enviado, os checkboxes nao seram exibidos`},getItemMenu:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(item: Row) => false | string | JSX.Element | DropdownItem[]`,signature:{arguments:[{type:{name:`any`},name:`item`}],return:{name:`union`,raw:`false | string | JSX.Element | DropdownItem[]`,elements:[{name:`literal`,value:`false`},{name:`string`},{name:`JSX.Element`},{name:`Array`,elements:[{name:`DropdownItem`}],raw:`DropdownItem[]`}]}}},description:`funcao que retorna o conteudo do menu que sera exibido quando clicar no menu de cada linha,
caso nao seja enviado, o botao nao sera exibido`},itemMenuVerticalAlign:{required:!1,tsType:{name:`union`,raw:`| 'baseline'
| 'center'
| 'end'
| 'first baseline'
| 'flex-end'
| 'flex-start'
| 'last baseline'
| 'left'
| 'right'
| 'safe'
| 'space-around'
| 'space-between'
| 'space-evenly'
| 'start'
| 'stretch'
| 'unsafe'
| 'inherit'
| 'initial'
| 'unset'`,elements:[{name:`literal`,value:`'baseline'`},{name:`literal`,value:`'center'`},{name:`literal`,value:`'end'`},{name:`literal`,value:`'first baseline'`},{name:`literal`,value:`'flex-end'`},{name:`literal`,value:`'flex-start'`},{name:`literal`,value:`'last baseline'`},{name:`literal`,value:`'left'`},{name:`literal`,value:`'right'`},{name:`literal`,value:`'safe'`},{name:`literal`,value:`'space-around'`},{name:`literal`,value:`'space-between'`},{name:`literal`,value:`'space-evenly'`},{name:`literal`,value:`'start'`},{name:`literal`,value:`'stretch'`},{name:`literal`,value:`'unsafe'`},{name:`literal`,value:`'inherit'`},{name:`literal`,value:`'initial'`},{name:`literal`,value:`'unset'`}]},description:`alinhamento vertical da coluna do botao do dropdown`},centerCoodinates:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  /** centro 50, default 50 */
  x?: number
  /** centro 50, default 85 */
  y?: number
}`,signature:{properties:[{key:`x`,value:{name:`number`,required:!1},description:`centro 50, default 50`},{key:`y`,value:{name:`number`,required:!1},description:`centro 50, default 85`}]}},description:`coordenadas da tela, em porcentagem, que o dropdown ira usar pra saber a direcao que ele deve abrir, sendo 50-50 o ponto central exato da tela`},getRowDisabled:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(row: Row) => boolean`,signature:{arguments:[{type:{name:`any`},name:`row`}],return:{name:`boolean`}}},description:`callback que ira executar para verificar se o item deve estar desabilitado`},headerless:{required:!1,tsType:{name:`boolean`},description:`indicador se a tabela deve ter cabecalho`},list:{required:!1,tsType:{name:`boolean`},description:`indicador se a tabela deve ter aparencia de lista`},borderless:{required:!1,tsType:{name:`boolean`},description:`indicador se a tabela deve borda`},onClickColumn:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(
  row: [Row, number],
  col: [ColumnInterface, number],
  e: React.MouseEvent<HTMLTableCellElement>,
) => void`,signature:{arguments:[{type:{name:`tuple`,raw:`[Row, number]`,elements:[{name:`any`},{name:`number`}]},name:`row`},{type:{name:`tuple`,raw:`[ColumnInterface, number]`,elements:[{name:`ColumnInterface`},{name:`number`}]},name:`col`},{type:{name:`ReactMouseEvent`,raw:`React.MouseEvent<HTMLTableCellElement>`,elements:[{name:`HTMLTableCellElement`}]},name:`e`}],return:{name:`void`}}},description:`callback que ira executar ao clicar em alguma coluna`},messages:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  /** mensagem exibida quando nao encontra nenhum resultado */
  empty?: string | JSX.Element
  /** mensagem exibida quando nao encontra nenhum resultado, porem, com filtros aplicados */
  emptyWithFilters?: string | JSX.Element
}`,signature:{properties:[{key:`empty`,value:{name:`union`,raw:`string | JSX.Element`,elements:[{name:`string`},{name:`JSX.Element`}],required:!1},description:`mensagem exibida quando nao encontra nenhum resultado`},{key:`emptyWithFilters`,value:{name:`union`,raw:`string | JSX.Element`,elements:[{name:`string`},{name:`JSX.Element`}],required:!1},description:`mensagem exibida quando nao encontra nenhum resultado, porem, com filtros aplicados`}]}},description:`lista de mensagens, caso nao queira usar as mensagens padrao`},sort:{required:!1,tsType:{name:`SortInterface`},description:`objeto com o estado e a funcao para alterar o estado das ordenacoes`},paginator:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void | Promise<void>`,signature:{arguments:[],return:{name:`union`,raw:`void | Promise<void>`,elements:[{name:`void`},{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`}]}}},description:`callback que sera chamada quando o scroll do body chegar ao final`},page:{required:!1,tsType:{name:`number`},description:`indicador de numero da pagina`},setPage:{required:!1,tsType:{name:`ReactDispatch`,raw:`React.Dispatch<React.SetStateAction<number>>`,elements:[{name:`ReactSetStateAction`,raw:`React.SetStateAction<number>`,elements:[{name:`number`}]}]},description:`funcao para alterar o estado do numero da pagina`},resetKey:{required:!1,tsType:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}]},description:`chave de reset para paginação por cursor: ao mudar, o Manager volta o scroll para o topo
e reinicia o estado relacionado a seleção/scroll.`},keepCheckeds:{required:!1,tsType:{name:`boolean`},description:`indicador para manter os itens marcados mesmo apos recarregar os itens`}}}})),Lt,Rt,zt=t((()=>{n(),Lt=s(),Rt=e=>(0,Lt.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 320 512`,width:`1em`,height:`1em`,fill:`currentColor`,"aria-hidden":`true`,focusable:`false`,...e,children:(0,Lt.jsx)(`path`,{d:`M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9S301 192 288 192H32c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z`})}),Rt.__docgenInfo={description:``,methods:[],displayName:`CaretDown`}})),Bt,Vt=t((()=>{i(),x(),Bt=o(v)`
  ${({theme:e})=>e.useTypography(`p`,{fontWeight:`bold`})}

  text-align: center;
  position: relative;
  z-index: 99;
  color: #999999;

  svg {
    width: 14px;
    height: 14px;
    margin: 0 0 0 5px;
    flex: 0 0 auto;
  }
`})),Ht,Ut,Wt=t((()=>{n(),x(),zt(),Vt(),Ht=s(),Ut=e=>{let{setOpen:t,children:n,disabled:r,appearance:i}={...e};return(0,Ht.jsx)(y,{children:(0,Ht.jsxs)(Bt,{onClick:()=>{t(e=>!e)},disabled:r,$appearance:i,children:[n,(0,Ht.jsx)(Rt,{})]})})},Ut.__docgenInfo={description:``,methods:[],displayName:`Button`,props:{setOpen:{required:!0,tsType:{name:`ReactDispatch`,raw:`React.Dispatch<React.SetStateAction<boolean>>`,elements:[{name:`ReactSetStateAction`,raw:`React.SetStateAction<boolean>`,elements:[{name:`boolean`}]}]},description:`funcao que altera o estado do indicador de menu aberto`},children:{required:!0,tsType:{name:`union`,raw:`JSX.Element | string`,elements:[{name:`JSX.Element`},{name:`string`}]},description:`conteudo do botao`},disabled:{required:!1,tsType:{name:`boolean`},description:`indicador de botao desabilitado`}}}})),Gt,Kt,qt=t((()=>{n(),Gt=s(),Kt=e=>(0,Gt.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:16,height:16,fill:`none`,stroke:`currentColor`,strokeLinecap:`round`,strokeLinejoin:`round`,strokeWidth:2,className:`search_feather_svg__feather search_feather_svg__feather-search`,viewBox:`0 0 24 24`,...e,children:[(0,Gt.jsx)(`circle`,{cx:11,cy:11,r:8}),(0,Gt.jsx)(`path`,{d:`m21 21-4.35-4.35`})]}),Kt.__docgenInfo={description:``,methods:[],displayName:`SvgSearchFeather`}})),Jt,Yt,Xt=t((()=>{n(),Jt=s(),Yt=e=>(0,Jt.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:16,height:16,fill:`none`,stroke:`currentColor`,strokeLinecap:`round`,strokeLinejoin:`round`,strokeWidth:2,className:`x_svg__feather x_svg__feather-x`,viewBox:`0 0 24 24`,...e,children:(0,Jt.jsx)(`path`,{d:`M18 6 6 18M6 6l12 12`})}),Yt.__docgenInfo={description:``,methods:[],displayName:`SvgX`}})),Zt,Qt,$t=t((()=>{i(),Zt=o.button`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0;
  background-color: transparent;
  border: 0;
  box-shadow: none;
  &:not(:disabled) {
    cursor: pointer;
  }
`,Qt=o.div`
  width: ${({$width:e})=>e||`100%`};

  & > form {
    width: 100%;
    height: 100%;

    & > div {
      width: 100%;
    }
  }
`})),W,G,en,K,tn=t((()=>{W=e(n(),1),x(),qt(),Xt(),$t(),G=s(),en={feather:(0,G.jsx)(Kt,{})},K=e=>{let{loading:t,search:n}={...e},{width:r,fluid:i,transparent:a,size:o}={...e},s=en[e.icon||`feather`],c=e.setSearch,l=e.disabled===void 0?t:e.disabled,u=e.onSubmit||(()=>{}),[d,f]=(0,W.useState)(n||``),[p,m]=(0,W.useState)(n||``),[h,g]=e.inputState||[p,m],[_,v]=(0,W.useState)(null),b=e=>{c(e),g(e),f(e)},x=e=>{e.preventDefault(),b(h),u(h)},S=()=>{b(``),u(``)},C=(0,W.useCallback)(e=>{_&&_.contains(e.relatedTarget)||g(d)},[_,g,d]);return(0,G.jsx)(y,{children:(0,G.jsx)(Qt,{$width:r,children:(0,G.jsx)(`form`,{onSubmit:x,ref:v,children:(0,G.jsx)(ee,{type:`search`,name:`search`,icon:(()=>{if(!t)return h!==``&&h===d?(0,G.jsx)(Zt,{type:`button`,onClick:S,disabled:l,children:(0,G.jsx)(Yt,{})}):(0,G.jsx)(Zt,{type:`submit`,disabled:l,children:s})})(),placeholder:`Pesquisar`,value:h,onChange:e=>g(e.target.value),disabled:l||t,loading:t,fluid:i,transparent:a,size:o,onBlur:C})})})})},K.__docgenInfo={description:``,methods:[],displayName:`Search`,props:{search:{required:!1,tsType:{name:`string`},description:`Seta o valor inicial do input`},setSearch:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(search: string) => void`,signature:{arguments:[{type:{name:`string`},name:`search`}],return:{name:`void`}}},description:`funcao que ira controlar o valor do input de busca, alterado quando faz submit`},disabled:{required:!1,tsType:{name:`boolean`},description:`indicador de input desabilitado`},loading:{required:!1,tsType:{name:`boolean`},description:`indicador de input carregando`},inputState:{required:!1,tsType:{name:`tuple`,raw:`[string, React.Dispatch<React.SetStateAction<string>>]`,elements:[{name:`string`},{name:`ReactDispatch`,raw:`React.Dispatch<React.SetStateAction<string>>`,elements:[{name:`ReactSetStateAction`,raw:`React.SetStateAction<string>`,elements:[{name:`string`}]}]}]},description:`funcao que ira controlar o input de busca, alterado quando em tempo real`},onSubmit:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(value: string) => void`,signature:{arguments:[{type:{name:`string`},name:`value`}],return:{name:`void`}}},description:`funcao que sera chamada após fazer o submit do formulario`},width:{required:!1,tsType:{name:`string`},description:``},fluid:{required:!1,tsType:{name:`boolean`},description:``},transparent:{required:!1,tsType:{name:`boolean`},description:``},size:{required:!1,tsType:{name:`union`,raw:`'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive'`,elements:[{name:`literal`,value:`'mini'`},{name:`literal`,value:`'small'`},{name:`literal`,value:`'large'`},{name:`literal`,value:`'big'`},{name:`literal`,value:`'huge'`},{name:`literal`,value:`'massive'`}]},description:``},icon:{required:!1,tsType:{name:`literal`,value:`'feather'`},description:``}}}})),nn,rn,an=t((()=>{n(),nn=s(),rn=e=>(0,nn.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:16,height:16,fill:`none`,stroke:`currentColor`,strokeLinecap:`round`,strokeLinejoin:`round`,strokeWidth:2,className:`minus-circle_svg__feather minus-circle_svg__feather-minus-circle`,viewBox:`0 0 24 24`,...e,children:[(0,nn.jsx)(`circle`,{cx:12,cy:12,r:10}),(0,nn.jsx)(`path`,{d:`M8 12h8`})]}),rn.__docgenInfo={description:``,methods:[],displayName:`SvgMinusCircle`}})),on,sn,cn,ln,un,dn,fn,pn,mn,hn,gn,_n,vn,yn=t((()=>{i(),x(),on=o.div`
  width: 275px;
  height: 0px;
  box-shadow: 0px 3px 6px #00000029;
  position: absolute;
  top: calc(100% + 2px);
  right: 0;
  transition-property: height opacity;
  transition-duration: 0.25s;
  transition-timing-function: ease-in-out;
  background-color: #fff;
  z-index: 99;
  overflow: hidden;
  border-radius: 4px;
  color: #525a6a;
  font-size: 14px;

  ${({$open:e})=>e&&r`
      height: 261px;
    `}
`,sn=o.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 7px 0 14px 0;
`,cn=o.div`
  padding: 0px 3.5px 0px 14px;
  overflow: hidden;
`,ln=o.div`
  overflow: hidden scroll;
  padding-right: 3.5px;
  max-height: 100%;

  ${b}
`,un=o.div`
  padding: 7px 14px;

  display: flex;
  justify-content: space-between;
  color: rgba(38, 48, 70, 0.5);

  > h4 {
    ${({theme:e})=>e.useTypography(`h4`,{fontWeight:`bold`})}
    margin: 0;
    color: #263046;
  }
`,dn=o.div`
  padding: 7px 14px;
`,fn=o.div`
  display: flex;
  justify-content: space-between;
  padding: 7px 0;
  align-items: center;

  border-bottom: 1px solid #67676733;
`,pn=o(v)`
  width: auto;
  ${({theme:e})=>e.useTypography(`p`)}

  color: rgb(38, 48, 70);
  opacity: 0.5;
  cursor: pointer;

  &:disabled {
    color: #999999;
  }
`,mn=o(v)`
  width: auto;
  ${({theme:e})=>e.useTypography(`p`)}
  height: min-content;
  display: flex;

  &:disabled {
    color: #999999;
    i {
      border-color: #999999;
    }
  }
`,hn=o.span`
  ${({theme:e})=>e.useTypography(`p`)}
  color: rgba(38, 48, 70, 0.5);
`,gn=o.div`
  width: calc(100% - 21px);
`,_n=o.div`
  padding: 0 20px;
  margin-top: 49px;
  color: #c8c8c8;
  ${({theme:e})=>e.useTypography(`p`)}
`,vn=o.h4`
  ${({theme:e})=>e.useTypography(`h4`,{fontWeight:`bold`})}

  margin: 0;
  color: #263046;
`})),q,J,bn,xn,Sn=t((()=>{q=e(n(),1),P(),tn(),an(),yn(),J=s(),bn=e=>typeof e==`string`||typeof e==`number`?String(e):Array.isArray(e)?e.map(bn).join(` `):q.isValidElement(e)?bn(e.props.children):``,xn=e=>{let{open:t}={...e},{appliedFilters:n,setAppliedFilters:r,loading:i}={...e},[a,o]=(0,q.useState)(``),[s,c]=(0,q.useState)(``),[l,u]=(0,q.useState)([...n]),d=e=>{e=e.toLocaleLowerCase(),u(n.filter(t=>{let{filter:n,option:r}=t.labels,i=n.toLocaleLowerCase(),a=bn(r);return i.indexOf(e)!==-1||r!==null&&a.toLocaleLowerCase().indexOf(e)!==-1}))};return(0,q.useEffect)(()=>{t||(o(``),c(``))},[t]),(0,q.useEffect)(()=>{d(a)},[n]),(0,q.useEffect)(()=>{d(a)},[a]),(0,J.jsx)(on,{$open:t,children:(0,J.jsxs)(sn,{children:[(0,J.jsxs)(un,{children:[(0,J.jsx)(vn,{children:`Filtros aplicados`}),(0,J.jsx)(pn,{onClick:()=>{r([])},disabled:i||n.length===0,children:`Limpar todos`})]}),(0,J.jsx)(dn,{children:(0,J.jsx)(K,{setSearch:o,inputState:[s,c]})}),(0,J.jsx)(cn,{children:(0,J.jsx)(ln,{children:l.length>0?l.map((e,t)=>(0,J.jsxs)(fn,{children:[(0,J.jsxs)(gn,{children:[(0,J.jsx)(hn,{children:e.labels.filter}),` `,(0,J.jsx)(`br`,{}),(0,J.jsx)(N,{children:(0,J.jsx)(`strong`,{children:e.labels.option})})]}),(0,J.jsx)(mn,{onClick:()=>{r(n.filter(t=>t.name!==e.name))},disabled:i,children:(0,J.jsx)(rn,{width:14,height:14})})]},t)):(0,J.jsx)(`div`,{style:{textAlign:`center`},children:(0,J.jsx)(_n,{children:`Nenhum resultado foi encontrado`})})})})]})})},xn.__docgenInfo={description:``,methods:[],displayName:`Menu`,props:{appliedFilters:{required:!0,tsType:{name:`Array`,elements:[{name:`AppliedFilter`}],raw:`AppliedFilter[]`},description:`estado que contem os filtros aplicados`},setAppliedFilters:{required:!0,tsType:{name:`ReactDispatch`,raw:`React.Dispatch<React.SetStateAction<AppliedFilter[]>>`,elements:[{name:`ReactSetStateAction`,raw:`React.SetStateAction<AppliedFilter[]>`,elements:[{name:`Array`,elements:[{name:`AppliedFilter`}],raw:`AppliedFilter[]`}]}]},description:`funcao que ira alterar o estado dos filtros aplicados`},loading:{required:!1,tsType:{name:`boolean`},description:`estado do loading do manager`},open:{required:!0,tsType:{name:`boolean`},description:`indicador de menu aberto ou fechado`}}}})),Y,X,Cn,wn=t((()=>{Y=e(n(),1),He(),x(),ue(),Wt(),Sn(),X=s(),Cn=e=>{let{appliedFilters:t,setAppliedFilters:n,loading:r}={...e},[i,a]=(0,Y.useState)(!1),o=(0,Y.useRef)(null),s=e=>{o.current instanceof Element&&document.body.contains(o.current)&&document.body.contains(e.target)&&!o.current.contains(e.target)&&a(!1)};return(0,Y.useEffect)(()=>(document.addEventListener(`mousedown`,s),()=>{document.removeEventListener(`mousedown`,s)}),[]),(0,Y.useEffect)(()=>{if(!(i||!o||!o.current||!document.body.contains(o.current)))try{let e=Be(`div[2]/div/div[3]/div`,o.current);if(!(e instanceof HTMLElement))return;e.scrollTo({top:0})}catch{}},[i]),(0,Y.useEffect)(()=>{t.length===0&&a(!1)},[t]),(0,X.jsx)(y,{children:(0,X.jsxs)(`div`,{ref:o,children:[(0,X.jsx)(k,{on:`click`,message:`No momento não há nenhum filtro aplicado`,position:`bottom`,disabled:t.length>0,children:(0,X.jsx)(`div`,{children:(0,X.jsx)(Ut,{setOpen:e=>{t.length>0&&a(e)},appearance:t.length===0?`disabled`:void 0,children:(0,X.jsxs)(Y.Fragment,{children:[`Filtros aplicados (`,t.length,`)`]})})})}),(0,X.jsx)(xn,{open:i,appliedFilters:t,setAppliedFilters:n,loading:r})]})})},Cn.__docgenInfo={description:``,methods:[],displayName:`Applied`,props:{appliedFilters:{required:!0,tsType:{name:`Array`,elements:[{name:`AppliedFilter`}],raw:`AppliedFilter[]`},description:`estado que contem os filtros aplicados`},setAppliedFilters:{required:!0,tsType:{name:`ReactDispatch`,raw:`React.Dispatch<React.SetStateAction<AppliedFilter[]>>`,elements:[{name:`ReactSetStateAction`,raw:`React.SetStateAction<AppliedFilter[]>`,elements:[{name:`Array`,elements:[{name:`AppliedFilter`}],raw:`AppliedFilter[]`}]}]},description:`funcao que ira alterar o estado dos filtros aplicados`},loading:{required:!1,tsType:{name:`boolean`},description:`estado do loading do manager`}}}})),Tn,En,Dn=t((()=>{n(),Tn=s(),En=e=>(0,Tn.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 320 512`,width:`1em`,height:`1em`,fill:`currentColor`,"aria-hidden":`true`,focusable:`false`,...e,children:(0,Tn.jsx)(`path`,{d:`M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z`})}),En.__docgenInfo={description:``,methods:[],displayName:`CaretRight`}})),On,kn,An=t((()=>{i(),On=a`
  to {
    transform: rotate(360deg);
  }
`,kn=o.div`
  width: ${({$size:e})=>`${e}px`};
  height: ${({$size:e})=>`${e}px`};

  border-radius: 999px;
  border: ${({$thickness:e})=>`${e}px`} solid
    ${({$trackColor:e})=>e};
  border-top-color: ${({$color:e})=>e};

  animation: ${On} 0.8s linear infinite;
`})),jn,Mn,Nn=t((()=>{An(),jn=s(),Mn=e=>{let{size:t=32,thickness:n=3,color:r=`#5e78bd`,trackColor:i=`#e6e6e6`,label:a=`Carregando`}={...e};return(0,jn.jsx)(kn,{role:`status`,"aria-label":a,$size:t,$thickness:n,$color:r,$trackColor:i})},Mn.__docgenInfo={description:``,methods:[],displayName:`Spinner`,props:{size:{required:!1,tsType:{name:`number`},description:``},thickness:{required:!1,tsType:{name:`number`},description:``},color:{required:!1,tsType:{name:`string`},description:``},trackColor:{required:!1,tsType:{name:`string`},description:``},label:{required:!1,tsType:{name:`string`},description:`acessibilidade (ex.: 'Carregando')`}}}})),Pn,Fn,In,Ln,Rn,zn,Bn,Vn,Hn,Un,Wn,Gn=t((()=>{i(),x(),Pn=o.div`
  ${({theme:e})=>e.useTypography(`p`)}

  ${v} {
    color: #525a6a;
  }
  transition-property: width opacity;
  transition-duration: 0.25s;
  transition-timing-function: ease-in-out;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  opacity: ${({$open:e})=>e?1:0};

  box-shadow: 0px 3px 6px #00000029;
  border-radius: 5px;
  z-index: 99;
  background-color: #fff;
  position: absolute;
  top: 100%;
  max-height: ${({$maxHeight:e})=>e?`${e}px`:`261px`};
  font-size: 14px;

  display: flex;
  flex-direction: column;
`,Fn=o(Pn)`
  width: ${({$open:e,$width:t})=>e?`${t||208}px`:0};
  right: 0;
  padding: 7px 3.5px 7px 0;

  > div {
    overflow-y: scroll;
    padding-right: 3.5px;

    ${b}
  }

  ${v} {
    padding: 7px 7px 7px 14px;
    display: flex;
    justify-content: space-between;

    svg {
      width: 14px;
      height: 14px;
      margin-left: 10px;
      flex: 0 0 auto;
    }

    &:hover {
      cursor: pointer;
      background-image: linear-gradient(#fff, #fafafb);
    }
  }
`,In=o(Pn)`
  width: ${({$open:e,$width:t})=>e?`${t||208}px`:0};
  right: 210px;
  padding: 7px 3.5px 7px 0;
`,Ln=o.div`
  padding: 7px 10.5px 7px 14px;
`,Rn=o(v)`
  ${({theme:e})=>e.useTypography(`p`)}

  padding: ${({$thin:e})=>e?`7px 0px 7px 0px`:`14px 0px 14px 0px`};
  ${({$bordered:e})=>e?r`
          border-bottom: 1px solid rgba(112, 112, 112, 0.15);
        `:r``};

  &:hover {
    cursor: pointer;
    background-image: linear-gradient(#fff, #fafafb);
  }
`,zn=o.div`
  color: #525a6a;
  overflow: hidden scroll;
  display: flex;
  flex-direction: column;
  padding-left: 14px;
  padding-right: 3.5px;

  ${b}

  ${({$fullHeight:e})=>e&&r`
      height: calc(270px - 7px - 7px);
    `}
`,Bn=o.div`
  ${({theme:e})=>e.useTypography(`p`)}

  padding: 0 20px;
  margin-top: 49px;
  color: #c8c8c8;
`,Vn=o.span`
  ${({theme:e})=>e.useTypography(`p`,{fontWeight:`bold`})}

  color: #263046;
  opacity: 0.5;
  display: block;
`,Hn=o.div`
  margin-top: 14px;
`,Un=o.hr`
  width: calc(100% - 20px);
  color: #707070;
  opacity: 0.16;
  border-width: 1px 0 0 0;
  margin: 0 auto;
`,Wn=o.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 90px);
  background-color: #fff;
  z-index: 99;

  display: flex;
  align-items: center;
  justify-content: center;
`})),Z,Q,Kn,qn=t((()=>{Z=e(n(),1),He(),x(),P(),Dn(),Nn(),tn(),Gn(),Q=s(),Kn=e=>{let{appliedFilters:t,setAppliedFilters:n,filters:r,loading:i,open:a,setOpen:o}={...e},[s,c]=(0,Z.useState)(-1),[l,u]=(0,Z.useState)(null),[d,f]=(0,Z.useState)([]),[,p]=(0,Z.useState)(`left`),[m,h]=(0,Z.useState)(``),[ee,g]=(0,Z.useState)(1),[_,y]=(0,Z.useState)(!1),[b,x]=(0,Z.useState)(``),[S,C]=(0,Z.useState)(!1),[te,ne]=(0,Z.useState)(new Date),w=(0,Z.useRef)(null),re=()=>{x(``),h(``)},T=e=>{w.current instanceof Element&&document.body.contains(e.target)&&!w.current.contains(e.target)&&(c(-1),re(),l&&typeof l.options==`function`&&f([]))},E=async(e,t)=>{if(t===void 0&&(t=b),S||!l||typeof l.options!=`function`)return;C(!0);let n=await l.options(t,e);g(e),Array.isArray(n)?(f(n),y(!0)):(f(e>1?e=>e.concat(n.options):n.options),y(!!n.lastPage)),C(!1)},ie=async()=>{_||E(ee+1)},ae=e=>{let t=e.nativeEvent.target,n=t.scrollHeight-t.getBoundingClientRect().height-10,r=t.scrollTop;if(n>0&&r>=n){if(Math.abs((new Date().getTime()-te.getTime())/1e3)<.5)return;ne(new Date),ie()}},D=()=>{w.current&&p(w.current.offsetLeft*100/window.innerWidth>50?`right`:`left`)};(0,Z.useEffect)(()=>(D(),document.addEventListener(`mousedown`,T),window.addEventListener(`resize`,D),()=>{document.removeEventListener(`mousedown`,T),window.removeEventListener(`resize`,D)}),[]),(0,Z.useEffect)(()=>{if(!(a||!w||!w.current||!document.body.contains(w.current)))try{let e=Be(`div/div`,w.current);if(!(e instanceof HTMLElement))return;e.scrollTo({top:0})}catch{}},[a]);let oe=e=>{l&&typeof l.options==`function`&&(l.allowEmptyString===!1&&e.trim()===``?f([]):E(1,e))},se=(e,t)=>{re(),s===t?(c(-1),l&&typeof l.options==`function`&&f([])):(u(e),c(t),f(typeof e.options==`function`?[]:e.options))},ce=e=>{for(let n=0;n<t.length;n++)if(t[n].name===e)return{value:t[n].value};return null},O=(e,r)=>{let i=t.filter(e=>e.name!==r.name);i.push({name:r.name,labels:{filter:r.label,option:e.label},value:e.value}),n(i),re(),l&&typeof l.options==`function`&&f([]),c(-1),o(!1)},le=e=>{let t=l?ce(l.name):null,n=!1,r=!1,i=(0,Q.jsx)(Z.Fragment,{}),a=!0;return typeof e.options==`function`&&(n=!0,r=!0,a=!1,i=(0,Q.jsxs)(Z.Fragment,{children:[(0,Q.jsx)(Hn,{children:(0,Q.jsx)(K,{setSearch:x,loading:S,inputState:[m,h],onSubmit:oe,size:`small`})}),S&&(0,Q.jsx)(Wn,{children:(0,Q.jsx)(Mn,{})}),d.length===0&&(0,Q.jsx)(`div`,{style:{textAlign:`center`},children:(0,Q.jsx)(Bn,{children:b===``?(0,Q.jsxs)(Z.Fragment,{children:[`Utilize a busca para pesquisar por `,(0,Q.jsx)(`br`,{}),e.label]}):(0,Q.jsx)(Z.Fragment,{children:`Nenhum resultado foi encontrado`})})})]})),(0,Q.jsxs)(Z.Fragment,{children:[(0,Q.jsxs)(Ln,{children:[(0,Q.jsx)(Vn,{children:e.label}),i]}),(0,Q.jsx)(zn,{onScroll:ae,$fullHeight:n,children:d.map((n,i)=>(0,Q.jsx)(Rn,{onClick:()=>{O(n,e)},disabled:t!==null&&t.value===n.value,$thin:n.thin||a,$bordered:r,children:(0,Q.jsx)(N,{children:n.label})},i))})]})};return(0,Q.jsxs)(`div`,{ref:w,children:[(0,Q.jsx)(Fn,{$open:a,children:(0,Q.jsx)(`div`,{children:r.map((e,t)=>(0,Q.jsxs)(Z.Fragment,{children:[(0,Q.jsxs)(v,{onClick:()=>{se(e,t)},disabled:i||S||e.disabled,children:[(0,Q.jsx)(N,{children:e.label}),(0,Q.jsx)(En,{})]}),e.delimiter&&(0,Q.jsx)(Un,{})]},t))})}),(()=>{let e=null,t;return l&&(e=le(l),typeof l.options==`function`&&(t=275)),(0,Q.jsx)(In,{$open:s!==-1,$width:t,children:e})})()]})},Kn.__docgenInfo={description:``,methods:[],displayName:`List`}})),Jn,Yn,Xn,Zn=t((()=>{Jn=e(n(),1),x(),Wt(),qn(),Yn=s(),Xn=e=>{let{filters:t,appliedFilters:n,setAppliedFilters:r,loading:i,bottomMargin:a}={...e},[o,s]=(0,Jn.useState)(!1),c=(0,Jn.useRef)(null),l=e=>{c.current instanceof Element&&document.body.contains(e.target)&&!c.current.contains(e.target)&&s(!1)};return(0,Jn.useEffect)(()=>(document.addEventListener(`mousedown`,l),()=>{document.removeEventListener(`mousedown`,l)}),[]),(0,Yn.jsx)(y,{children:(0,Yn.jsxs)(`div`,{ref:c,children:[(0,Yn.jsx)(Ut,{setOpen:s,disabled:t.length===0,children:`Filtros`}),(0,Yn.jsx)(Kn,{appliedFilters:n,setAppliedFilters:r,filters:t,loading:i,open:o,setOpen:s,bottomMargin:a})]})})},Xn.__docgenInfo={description:``,methods:[],displayName:`Menu`,props:{appliedFilters:{required:!0,tsType:{name:`Array`,elements:[{name:`AppliedFilter`}],raw:`AppliedFilter[]`},description:`estado que contem os filtros aplicados`},setAppliedFilters:{required:!0,tsType:{name:`ReactDispatch`,raw:`React.Dispatch<React.SetStateAction<AppliedFilter[]>>`,elements:[{name:`ReactSetStateAction`,raw:`React.SetStateAction<AppliedFilter[]>`,elements:[{name:`Array`,elements:[{name:`AppliedFilter`}],raw:`AppliedFilter[]`}]}]},description:`funcao que ira alterar o estado dos filtros aplicados`},filters:{required:!0,tsType:{name:`Array`,elements:[{name:`Filter`}],raw:`Filter[]`},description:`lista de filtros`},loading:{required:!1,tsType:{name:`boolean`},description:`estado do loading do manager`},bottomMargin:{required:!1,tsType:{name:`number`},description:`espaco que a lista de filtros deve ter do rodape da pagina, default 8`}}}})),Qn,$n,er,tr=t((()=>{i(),x(),Qn=o(v)`
  display: flex;
  align-items: center;
  justify-content: center;
  &:disabled {
    svg {
      color: #999999;
    }
  }
`,$n=o.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  > div {
    position: initial;

    display: flex;
    align-items: center;
    height: 100%;

    > label input {
      border: 0;
    }
    > label button {
      bottom: auto;
      top: 50%;
      transform: translateY(-50%);
    }
    > label + div {
      bottom: auto;
      top: 50%;
      transform: translateY(-50%);
      left: 14px;
      height: 17px;
      width: calc(100% - 24px - 28px);
    }
  }
`,er=o.div`
  & > div {
    position: initial;
    & > div {
      border: none;
    }
  }
`})),nr,rr,ir=t((()=>{n(),nr=s(),rr=e=>(0,nr.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:17,height:17,fill:`none`,stroke:`currentColor`,strokeLinecap:`round`,strokeLinejoin:`round`,strokeWidth:2,className:`down_svg__feather down_svg__feather-corner-right-down`,viewBox:`0 0 24 24`,...e,children:[(0,nr.jsx)(`path`,{d:`m10 15 5 5 5-5`}),(0,nr.jsx)(`path`,{d:`M4 4h7a4 4 0 0 1 4 4v12`})]}),rr.__docgenInfo={description:``,methods:[],displayName:`SvgDown`}})),ar,or,sr,cr=t((()=>{n(),x(),ue(),tr(),ir(),ar=s(),or={default:`Carregar mais itens`,final:`Todos os itens já foram carregados`},sr=e=>{let{loader:t,loading:n,isLastPage:r}={...e},i=or;e.messages&&Object.assign(i,e.messages);let a=i.default,o=n,s=`hover`;return r&&(a=i.final,o=!0,s=`click`),(0,ar.jsx)(y,{children:(0,ar.jsx)(k,{on:s,message:a,children:(0,ar.jsx)(Qn,{onClick:t,$appearance:o?`disabled`:void 0,disabled:o,children:(0,ar.jsx)(rr,{})})})})},sr.__docgenInfo={description:``,methods:[],displayName:`PageLoader`,props:{loader:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void | Promise<void>`,signature:{arguments:[],return:{name:`union`,raw:`void | Promise<void>`,elements:[{name:`void`},{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`}]}}},description:`callback que ira ser chamada quando o botao for clicado`},loading:{required:!1,tsType:{name:`boolean`},description:`indicador de loading ativo`},isLastPage:{required:!0,tsType:{name:`boolean`},description:`indicador de ultima pagina`},messages:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  /** mensagem default, aparece quando o botao esta habilitado */
  default?: string
  /** mensagem de quando ja chegou na ultima pagina */
  final?: string
}`,signature:{properties:[{key:`default`,value:{name:`string`,required:!1},description:`mensagem default, aparece quando o botao esta habilitado`},{key:`final`,value:{name:`string`,required:!1},description:`mensagem de quando ja chegou na ultima pagina`}]}},description:`lista de mensagens que apareceram no tooltip`}}}})),lr,ur,dr=t((()=>{n(),lr=s(),ur=e=>(0,lr.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:17,height:17,fill:`none`,stroke:`currentColor`,strokeLinecap:`round`,strokeLinejoin:`round`,strokeWidth:2,className:`refresh_svg__feather refresh_svg__feather-rotate-cw`,viewBox:`0 0 24 24`,...e,children:[(0,lr.jsx)(`path`,{d:`M23 4v6h-6`}),(0,lr.jsx)(`path`,{d:`M20.49 15a9 9 0 1 1-2.12-9.36L23 10`})]}),ur.__docgenInfo={description:``,methods:[],displayName:`SvgRefresh`}})),fr,pr,mr=t((()=>{x(),ue(),tr(),dr(),fr=s(),pr=e=>{let{reloader:t,loading:n}={...e};return(0,fr.jsx)(y,{children:(0,fr.jsx)(k,{on:`hover`,message:`Atualizar`,position:`bottom`,children:(0,fr.jsx)(Qn,{onClick:t,disabled:n,children:(0,fr.jsx)(ur,{})})})})},pr.__docgenInfo={description:``,methods:[],displayName:`Refresh`,props:{reloader:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:`callback que ira ser chamada quando o botao for clicado`},loading:{required:!1,tsType:{name:`boolean`},description:`indicador de loading ativo`}}}})),$,hr,gr=t((()=>{n(),c(),ie(),wn(),Zn(),cr(),mr(),tn(),tr(),$=s(),hr=e=>{let{filters:t,search:n,reloader:r,loading:i,pagination:a,calendar:o,calendarInterval:s,children:c,before:u,after:d}=e,f=e.except||{paginator:!0,calendar:!0,calendarInterval:!0},p=[];u&&(p=p.concat(u));let m=()=>{};if(a){let{setPage:e,reset:t,isLastPage:n,paginator:r}=a;m=t||(()=>e?.(1)),r&&!f.paginator&&p.push((0,$.jsx)(sr,{loader:r,loading:i,isLastPage:n}))}if(r&&!f.reloader&&p.push((0,$.jsx)(pr,{reloader:r,loading:i})),n&&!f.search){let{setSearch:e,search:t}=n;p.push((0,$.jsx)(K,{search:t,setSearch:t=>{e(t),m()},disabled:i,icon:`feather`,width:`250px`,transparent:!0,fluid:!0}))}if(t){let{appliedFilters:e,setAppliedFilters:n,bottomMargin:r}=t,a=e=>{n(e),m()};f.applied||p.push((0,$.jsx)(Cn,{setAppliedFilters:a,appliedFilters:e,loading:i})),f.filters||p.push((0,$.jsx)(Xn,{appliedFilters:e,setAppliedFilters:a,filters:t.filters,loading:i,bottomMargin:r}))}if(o&&!f.calendar){let{date:e,setDate:t}={...o};p.push((0,$.jsx)($n,{children:(0,$.jsx)(l,{type:`datepicker`,picker:{position:`right bottom`},value:e,setValue:t,disabled:i,borderless:!0,paddingless:!0})}))}if(s&&!f.calendarInterval){let{dateInterval:e,setDateInterval:t}={...s};p.push((0,$.jsx)(er,{children:(0,$.jsx)(l,{type:`date-interval-picker`,value:e,setValue:t,disabled:i,borderless:!0,paddingless:!0})}))}return d&&(p=p.concat(d)),(0,$.jsx)(E,{left:c,right:p})},hr.useDefaultDateIntervalState=l.useDefaultDateIntervalState,hr.__docgenInfo={description:``,methods:[],displayName:`Toolbar`,props:{filters:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  /** lista de filtros disponiveis */
  filters: FiltersInterfaces.Filter[]
  /** estado que contem a lista de filtros aplicados */
  appliedFilters: FiltersInterfaces.AppliedFilter[]
  /** funcao que altera o estado da lista de filtros aplicados */
  setAppliedFilters: React.Dispatch<
    React.SetStateAction<FiltersInterfaces.AppliedFilter[]>
  >
  /** espaco que a lista de filtros deve ter do rodape da pagina, default 8 */
  bottomMargin?: number
}`,signature:{properties:[{key:`filters`,value:{name:`Array`,elements:[{name:`FiltersInterfaces.Filter`}],raw:`FiltersInterfaces.Filter[]`,required:!0},description:`lista de filtros disponiveis`},{key:`appliedFilters`,value:{name:`Array`,elements:[{name:`FiltersInterfaces.AppliedFilter`}],raw:`FiltersInterfaces.AppliedFilter[]`,required:!0},description:`estado que contem a lista de filtros aplicados`},{key:`setAppliedFilters`,value:{name:`ReactDispatch`,raw:`React.Dispatch<
  React.SetStateAction<FiltersInterfaces.AppliedFilter[]>
>`,elements:[{name:`ReactSetStateAction`,raw:`React.SetStateAction<FiltersInterfaces.AppliedFilter[]>`,elements:[{name:`Array`,elements:[{name:`FiltersInterfaces.AppliedFilter`}],raw:`FiltersInterfaces.AppliedFilter[]`}]}],required:!0},description:`funcao que altera o estado da lista de filtros aplicados`},{key:`bottomMargin`,value:{name:`number`,required:!1},description:`espaco que a lista de filtros deve ter do rodape da pagina, default 8`}]}},description:`configuracoes dos filtros`},search:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  /** Recebe o valor inicial do componente */
  search?: string
  /** funcao que altera o valor do estado da string de busca */
  setSearch: React.Dispatch<React.SetStateAction<string>>
}`,signature:{properties:[{key:`search`,value:{name:`string`,required:!1},description:`Recebe o valor inicial do componente`},{key:`setSearch`,value:{name:`ReactDispatch`,raw:`React.Dispatch<React.SetStateAction<string>>`,elements:[{name:`ReactSetStateAction`,raw:`React.SetStateAction<string>`,elements:[{name:`string`}]}],required:!0},description:`funcao que altera o valor do estado da string de busca`}]}},description:`configuracoes do filtro de busca`},reloader:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:`funcao que sera chamada ao clicar no botao refresh`},loading:{required:!1,tsType:{name:`boolean`},description:`indicador de loading ativo`},pagination:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  /** funcao para alterar a o estado do numero da pagina (offset pagination / legado) */
  setPage?: React.Dispatch<React.SetStateAction<number>>
  /** callback para resetar a paginação (cursor pagination) */
  reset?: () => void
  /** indicador de ultima pagina */
  isLastPage: boolean
  /** indicador de ultima pagina */
  paginator?: () => void
}`,signature:{properties:[{key:`setPage`,value:{name:`ReactDispatch`,raw:`React.Dispatch<React.SetStateAction<number>>`,elements:[{name:`ReactSetStateAction`,raw:`React.SetStateAction<number>`,elements:[{name:`number`}]}],required:!1},description:`funcao para alterar a o estado do numero da pagina (offset pagination / legado)`},{key:`reset`,value:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}},required:!1},description:`callback para resetar a paginação (cursor pagination)`},{key:`isLastPage`,value:{name:`boolean`,required:!0},description:`indicador de ultima pagina`},{key:`paginator`,value:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}},required:!1},description:`indicador de ultima pagina`}]}},description:`configuracoes da paginacao`},calendar:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  /** estado do filtro de data */
  date: string
  /** funcao que altera o estado do filtro de data */
  setDate: React.Dispatch<React.SetStateAction<string>>
}`,signature:{properties:[{key:`date`,value:{name:`string`,required:!0},description:`estado do filtro de data`},{key:`setDate`,value:{name:`ReactDispatch`,raw:`React.Dispatch<React.SetStateAction<string>>`,elements:[{name:`ReactSetStateAction`,raw:`React.SetStateAction<string>`,elements:[{name:`string`}]}],required:!0},description:`funcao que altera o estado do filtro de data`}]}},description:`configuracoes do filtro de data`},calendarInterval:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  /** estado do filtro de intervalo de data */
  dateInterval: [string, string]
  /** funcao que altera o estado do filtro de intervalo de data */
  setDateInterval: React.Dispatch<React.SetStateAction<[string, string]>>
}`,signature:{properties:[{key:`dateInterval`,value:{name:`tuple`,raw:`[string, string]`,elements:[{name:`string`},{name:`string`}],required:!0},description:`estado do filtro de intervalo de data`},{key:`setDateInterval`,value:{name:`ReactDispatch`,raw:`React.Dispatch<React.SetStateAction<[string, string]>>`,elements:[{name:`ReactSetStateAction`,raw:`React.SetStateAction<[string, string]>`,elements:[{name:`tuple`,raw:`[string, string]`,elements:[{name:`string`},{name:`string`}]}]}],required:!0},description:`funcao que altera o estado do filtro de intervalo de data`}]}},description:`configuracoes do filtro de intervalo de data`},children:{required:!1,tsType:{name:`union`,raw:`JSX.Element | JSX.Element[]`,elements:[{name:`JSX.Element`},{name:`Array`,elements:[{name:`JSX.Element`}],raw:`JSX.Element[]`}]},description:`conteudo diverso que sera exibido na parte esquerda da barra de ferramentas`},before:{required:!1,tsType:{name:`union`,raw:`JSX.Element | JSX.Element[]`,elements:[{name:`JSX.Element`},{name:`Array`,elements:[{name:`JSX.Element`}],raw:`JSX.Element[]`}]},description:`conteudo diverso que sera exibido na parte antes dos filtros`},after:{required:!1,tsType:{name:`union`,raw:`JSX.Element | JSX.Element[]`,elements:[{name:`JSX.Element`},{name:`Array`,elements:[{name:`JSX.Element`}],raw:`JSX.Element[]`}]},description:`conteudo diverso que sera exibido na parte depois dos filtros`},except:{required:!1,tsType:{name:`Except`},description:`os componentes especificados nesse objeto nao serao renderizados`}}}})),_r,vr=t((()=>{ie(),Ae(),P(),ze(),It(),gr(),wn(),Zn(),cr(),mr(),tn(),_r=Ft}));export{sr as a,Zn as c,K as d,tn as f,ie as g,E as h,mr as i,Cn as l,ze as m,vr as n,cr as o,Re as p,pr as r,Xn as s,_r as t,wn as u};