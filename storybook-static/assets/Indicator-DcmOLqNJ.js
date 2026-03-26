import{n as e}from"./chunk-BneVvdWh.js";import{t}from"./react-B_0iYUWB.js";import{a as n,i as r,o as i}from"./styled-components.browser.esm-BYvzgcDz.js";import{r as a}from"./iframe-fSyR9o4x.js";var o,s,c=e((()=>{o={medium:`15px`,small:`6px`,mini:`4px`},s={default:`warningGray`,info:`blue`,danger:`warningRed`,success:`green`,warning:`warningYellow`,temporary:`purple`}})),l,u=e((()=>{r(),c(),l=i.div`
  color: ${({theme:e,$labelColor:t})=>e.getColor(t)};
  display: flex;
  align-items: center;
  gap: ${({theme:{spacings:e}})=>e.s1};

  &:before {
    content: '';
    display: block;
    border-radius: 100%;

    ${({$size:e})=>n`
      width: ${o[e]};
      height: ${o[e]};
    `};

    background-color: ${({theme:{colors:e},$type:t})=>e[s[t]]};
  }
`})),d,f,p=e((()=>{t(),u(),d=a(),f=({size:e,type:t,labelColor:n,...r})=>(0,d.jsx)(l,{$size:e||`small`,$type:t||`default`,$labelColor:n||`darkBlue`,...r}),f.__docgenInfo={description:``,methods:[],displayName:`Indicator`}}));export{o as i,p as n,c as r,f as t};