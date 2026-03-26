import{n as e}from"./chunk-BneVvdWh.js";import{t}from"./react-B_0iYUWB.js";import{a as n,i as r,o as i}from"./styled-components.browser.esm-BYvzgcDz.js";import{c as a,l as o,r as s}from"./iframe-fSyR9o4x.js";import{c,t as l}from"./formatters-C0aJpNv6.js";import{n as u,t as d}from"./Loader-CzH8aMET.js";var f,p=e((()=>{r(),f=i.button`
  padding: 0
    ${({theme:e,$appearance:t})=>t===`link`?0:e.spacings.s3};
  font-family: ${({theme:e})=>e.fonts.Lato};
  font-weight: ${({$appearance:e})=>e===`link`?`normal`:`bold`};
  border-radius: 4px;
  position: relative;
  user-select: none;

  ${({$size:e,theme:t})=>{let{sizes:r}=t.components.button;return n`
      font-size: ${r[e].fontSize};
      line-height: ${r[e].lineHeight};
      min-width: ${r[e].minWidth};
      min-height: ${r[e].minHeight};
    `}};

  ${({$appearance:e,$color:t,theme:r})=>{let i=[`bordered`,`link`,`borderless`].includes(e)?`transparent`:r.getColor(t||`blue`);return n`
      background-color: ${i};
      border: 1px solid ${e===`bordered`?r.getColor(t||`blue`):i};
    `}};

  color: ${({$appearance:e,$color:t,$loading:n,theme:r})=>n?`transparent`:[`link`,`borderless`].includes(e)?t?r.colors[t]:r.getColor(`greyishBlue`,50):e===`bordered`?r.getColor(t||`blue`):r.getColor(`white`)};

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &:hover {
    cursor: ${({$loading:e,disabled:t})=>e||t?`default`:`pointer`};

    ${({$appearance:e,$color:t,theme:r})=>e===`bordered`?n`
          color: ${r.getColor(t||`blue`,70)};
          border: 1px solid ${r.getColor(t||`blue`,70)};
        `:[`link`,`borderless`].includes(e)?n`
          color: ${r.colors.blue};
        `:n`
        background-color: ${r.getColor(t||`blue`,70)};
        border-color: ${r.getColor(t||`blue`,70)};
      `}
  }

  &:active {
    ${({$appearance:e,$color:t,theme:r})=>e===`bordered`?n`
          background-color: ${r.getColor(`iceWhite`)};
        `:[`link`,`borderless`].includes(e)?n`
          color: ${r.getColor(`blue`,50)};
        `:n`
        color: ${r.getColor(t||`blue`)};
      `};
  }

  ${({$loading:e})=>{if(e)return n`
      pointer-events: none;
    `}}
`})),m,h,g=e((()=>{t(),c(),u(),a(),p(),m=s(),h=e=>{let{children:t,content:n,...r}=e,i={$appearance:r.appearance||`solid`,$color:r.color,$loading:r.loading?+r.loading:0,$size:r.size||`small`,type:r.type||`button`},a=l(e,[`size`,`appearance`,`color`,`loading`,`content`]),s=o[i.$size].lineHeight;return(0,m.jsxs)(f,{...i,...a,formNoValidate:`formNoValidate`in e?e.formNoValidate:e.type===`submit`,children:[t||n,e.loading&&(0,m.jsx)(d,{color:i.$appearance===`solid`?`white`:`blue`,size:s,borderSize:`calc(${s} * 0.0757)`})]})},h.__docgenInfo={description:``,methods:[],displayName:`Button`,props:{content:{required:!1,tsType:{name:`string`},description:`Text inside the button.`},loading:{required:!1,tsType:{name:`boolean`},description:`Define if button is loading.`}},composes:[`Omit`]}}));export{g as n,h as t};