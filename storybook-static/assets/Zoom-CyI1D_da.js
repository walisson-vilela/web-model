import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./react-B_0iYUWB.js";import{i as r,o as i}from"./styled-components.browser.esm-BYvzgcDz.js";import{r as a}from"./iframe-fSyR9o4x.js";import{n as o,t as s}from"./Button-BLRRkxhG.js";import{n as c,t as l}from"./Modal-BHf3hx4n.js";var u,d,f,p,m,h=t((()=>{r(),o(),u=i.img`
  max-width: 100%;
  max-height: 100%;
`,d=i.div`
  position: relative;
  display: inline-flex;

  &,
  ${u} {
    width: ${({$width:e})=>{switch(typeof e){case`string`:return e;case`number`:return`${e}px`;default:return`auto`}}};

    height: ${({$height:e})=>{switch(typeof e){case`string`:return e;case`number`:return`${e}px`;default:return`auto`}}};
  }
`,f=i.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({theme:e})=>e.getColor(`greyishBlue`,50)};
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.5s;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`,p=i(s)`
  background-color: ${({theme:e})=>e.getColor(`white`,50)};
`,m=i.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  img {
    max-height: 100%;
    max-width: 100%;
  }
`})),g,_,v,y=t((()=>{g=e(n(),1),c(),h(),_=a(),v=e=>{let{src:t,width:n,height:r,...i}=e,[a,o]=(0,g.useState)(!1);return(0,_.jsxs)(g.Fragment,{children:[(0,_.jsxs)(d,{...i,onClick:()=>o(!0),$width:n,$height:r,children:[(0,_.jsx)(u,{src:t,alt:`zoom`}),(0,_.jsx)(f,{children:(0,_.jsx)(p,{content:`Zoom`,color:`white`,onClick:()=>o(!0)})})]}),(0,_.jsx)(l,{openState:[a,o],size:`large`,title:`Zoom`,closeOnClickOutside:!0,children:(0,_.jsx)(m,{children:(0,_.jsx)(`img`,{src:t,alt:`zoom`})})})]})},v.__docgenInfo={description:``,methods:[],displayName:`Zoom`,props:{src:{required:!0,tsType:{name:`string`},description:``},width:{required:!1,tsType:{name:`union`,raw:`number | string`,elements:[{name:`number`},{name:`string`}]},description:``},height:{required:!1,tsType:{name:`union`,raw:`number | string`,elements:[{name:`number`},{name:`string`}]},description:``}}}}));export{y as n,v as t};