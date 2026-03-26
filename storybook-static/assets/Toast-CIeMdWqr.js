import{n as e}from"./chunk-BneVvdWh.js";import{t}from"./react-B_0iYUWB.js";import{a as n,i as r,o as i}from"./styled-components.browser.esm-BYvzgcDz.js";import{r as a}from"./iframe-fSyR9o4x.js";import{n as o,t as s}from"./Icon-7EFkF0Ko.js";var c,l,u,d=e((()=>{r(),c=i.div`
  border-radius: 4px;
  width: ${({$size:e})=>e===`large`?`837px`:`460px`};
  height: 88px;
  border: 1px solid transparent;
  position: relative;

  ${({$color:e})=>e===`success`&&n`
      background-color: #fcfff5;
      opacity: 1;
      border-color: #a8c599;
      h4 {
        color: #1e561f;
      }
      p {
        color: #1e561fcc;
      }
    `}

  ${({$color:e})=>e===`error`&&n`
      background-color: #fff6f6;
      opacity: 1;
      border-color: #973937;
      h4 {
        color: #973937;
      }
      p {
        color: #973937;
      }
    `}

  ${({$color:e})=>e===`warning`&&n`
      background-color: #fffaf3;
      opacity: 1;
      border-color: #ccbea0;
      h4 {
        color: #7a4d05;
      }
      p {
        color: #7a4d05cc;
      }
    `}

  svg {
    cursor: pointer;
    position: absolute;
    top: 14px;
    right: 14px;
    width: 13px;
    height: 13px;
  }
`,l=i.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 14px 14px 0 0;
  margin: 0;
`,u=i.div`
  width: 100%;
  padding: 13px 0 21px 28px;
  display: flex;
  flex: 1;
  flex-direction: column;

  h4 {
    margin-bottom: 7px;
    font-size: 18p;
  }
  p {
    margin: 0;
    font-size: 14px;
    max-width: 380px;
  }
`})),f,p,m=e((()=>{t(),o(),d(),f=a(),p=({size:e,color:t,title:n,description:r,onClose:i,...a})=>(0,f.jsxs)(c,{...a,$size:e,$color:t,children:[(0,f.jsx)(l,{children:(0,f.jsx)(s,{type:`feather`,icon:`x`,onClick:i})}),(0,f.jsxs)(u,{children:[(0,f.jsx)(`h4`,{children:n}),(0,f.jsxs)(`p`,{children:[` `,r]})]})]}),p.__docgenInfo={description:``,methods:[],displayName:`Toast`,props:{color:{required:!0,tsType:{name:`union`,raw:`'success' | 'error' | 'warning'`,elements:[{name:`literal`,value:`'success'`},{name:`literal`,value:`'error'`},{name:`literal`,value:`'warning'`}]},description:``},size:{required:!0,tsType:{name:`union`,raw:`'normal' | 'large'`,elements:[{name:`literal`,value:`'normal'`},{name:`literal`,value:`'large'`}]},description:``},title:{required:!0,tsType:{name:`string`},description:``},description:{required:!0,tsType:{name:`string`},description:``},onClose:{required:!0,tsType:{name:`Exclude`,elements:[{name:`FeatherIcon['onClick']`,raw:`FeatherIcon['onClick']`},{name:`undefined`}],raw:`Exclude<FeatherIcon['onClick'], undefined>`},description:``}}}}));export{m as n,p as t};