import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./react-B_0iYUWB.js";import{a as r,i,o as a}from"./styled-components.browser.esm-BYvzgcDz.js";import{r as o}from"./iframe-fSyR9o4x.js";import{c as s,t as c}from"./formatters-C0aJpNv6.js";import{n as l,t as u}from"./hooks-MVq9czon.js";import{n as d,t as f}from"./Icon-7EFkF0Ko.js";var p,m=t((()=>{i(),p=a.div`
  display: flex;
  gap: ${({theme:e,$gap:t})=>t===`0`?`0`:e.spacings[t]};
  align-items: center;
  color: ${({theme:e})=>e.colors.darkestGrey};

  ${({onClick:e})=>e?r`
      cursor: pointer;
    `:r`
        opacity: 0.3;
        pointer-events: none;
      `}
`})),h,g,_,v=t((()=>{h=e(n(),1),s(),u(),d(),m(),g=o(),_=e=>{let{getContent:t}=e,[n,r]=(0,h.useState)(!1),i=()=>r(!1),a=e.disabled?void 0:()=>r(e=>!e),o=c(e,[`getContent`,`gap`]);return(0,g.jsxs)(`div`,{ref:l(i),children:[(0,g.jsxs)(p,{...o,onClick:a,$gap:e.gap,children:[e.children,(0,g.jsx)(f,{type:`feather`,icon:n?`chevron_up`:`chevron_down`,width:`12px`})]}),t(n,i)]})},_.__docgenInfo={description:``,methods:[],displayName:`Button`,props:{disabled:{required:!1,tsType:{name:`literal`,value:`true`},description:``},getContent:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(open: boolean, close: () => void) => JSX.Element`,signature:{arguments:[{type:{name:`boolean`},name:`open`},{type:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},name:`close`}],return:{name:`JSX.Element`}}},description:``},gap:{required:!0,tsType:{name:`union`,raw:`keyof typeof spacings | '0'`,elements:[{name:`union`,raw:`keyof typeof spacings`,elements:[{name:`literal`,value:`s1`},{name:`literal`,value:`s2`},{name:`literal`,value:`s3`},{name:`literal`,value:`s4`},{name:`literal`,value:`s5`},{name:`literal`,value:`s6`}]},{name:`literal`,value:`'0'`}]},description:``}}}}));export{v as n,_ as t};