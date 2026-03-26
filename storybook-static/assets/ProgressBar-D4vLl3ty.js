import{n as e}from"./chunk-BneVvdWh.js";import{i as t,o as n}from"./styled-components.browser.esm-BYvzgcDz.js";import{r}from"./iframe-fSyR9o4x.js";var i,a,o=e((()=>{t(),i=n.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  opacity: ${({$disabled:e})=>e?.5:1};
  width: 100%;

  > span {
    display: inline-block;
    margin-left: 7px;
    color: #000000cc;
  }
`,a=n.div`
  width: 100%;
  height: 12px;
  border: 1px solid #e4e4e4;

  > span {
    content: '';
    display: flex;

    height: 100%;

    transition-property: width background-color;
    transition-duration: 0.25s;
    transition-timing-function: ease-in-out;

    background-color: ${({theme:e,$type:t})=>e.colors[{default:`warningGray`,info:`blue`,danger:`warningRed`,success:`green`,warning:`warningYellow`}[t]]};
  }
`})),s,c,l=e((()=>{o(),s=r(),c=({type:e,value:t,...n})=>(0,s.jsxs)(i,{$disabled:t===null,children:[(0,s.jsx)(a,{...n,$type:e,children:(0,s.jsx)(`span`,{style:{width:`${t||0}%`}})}),(0,s.jsxs)(`span`,{children:[` `,t===null?`-`:t,`%`]})]}),c.__docgenInfo={description:``,methods:[],displayName:`ProgressBar`,props:{type:{required:!0,tsType:{name:`union`,raw:`'default' | 'info' | 'danger' | 'success' | 'warning'`,elements:[{name:`literal`,value:`'default'`},{name:`literal`,value:`'info'`},{name:`literal`,value:`'danger'`},{name:`literal`,value:`'success'`},{name:`literal`,value:`'warning'`}]},description:``},value:{required:!0,tsType:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}]},description:``}}}}));export{l as n,c as t};