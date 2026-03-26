import{n as e}from"./chunk-BneVvdWh.js";import{t}from"./react-B_0iYUWB.js";import{a as n,i as r,o as i}from"./styled-components.browser.esm-BYvzgcDz.js";import{r as a}from"./iframe-fSyR9o4x.js";import{c as o,t as s}from"./formatters-C0aJpNv6.js";var c,l,u,d=e((()=>{r(),c=`17px`,l=i.div`
  ${({theme:e})=>e.useTypography(`p`)}
  display: flex;
  align-items: center;
  overflow: hidden;
`,u=i.label`
  display: flex;
  align-items: center;

  gap: ${({theme:e})=>e.spacings.s1};

  min-height: ${c};
  min-width: ${c};

  ${({$disabled:e})=>e?n`
      opacity: 0.5;
    `:n`
        > span {
          cursor: pointer;
        }
      `}

  ${({$required:e})=>{if(e)return n`
      > ${l} {
        &:after {
          content: ' *';
        }
      }
    `}}

  ${({$invalid:e})=>e?n`
      > span {
        border-color: ${({theme:e})=>e.colors.warningRed};
        &:before {
          background-color: ${({theme:e})=>e.colors.warningRed};
        }
      }
    `:n`
        > span {
          border-color: ${({theme:e})=>e.colors.lightestGrey};
          &:before {
            background-color: ${({theme:e})=>e.colors.lightestGrey};
          }
        }
        > input:checked + span {
          border-color: ${({theme:e})=>e.colors.blue};
          &:before {
            background-color: ${({theme:e})=>e.colors.blue};
          }
        }
      `}

  > input {
    position: absolute;
    height: 1px;
    width: 1px;
    opacity: 0;

    /* Appearance (General) */
    appearance: none;
    /* Appearance (Chrome, Safari, Edge, Opera) */
    &:-webkit-outer-spin-button,
    &:-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    /* Appearance (Firefox) */
    -moz-appearance: none;
  }

  > span {
    align-self: center;
    height: 17px;
    width: 17px;
    min-height: 17px;
    min-width: 17px;
    max-height: 17px;
    max-width: 17px;
    border-radius: 100%;
    border-width: 1px;
    border-style: solid;
    background-color: ${({theme:e})=>e.colors.white};
    position: relative;
    transition-property: border-color;
    transition-duration: 0.5s;
    transition-timing-function: ease-in-out;
    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      height: 0;
      width: 0;
      border-radius: 100%;
      transition-property: top, left, width, height, background-color;
      transition-duration: 0.5s;
      transition-timing-function: cubic-bezier(0.68, -0.55, 0.27, 1.55);
    }
  }
  > input:checked + span {
    &:before {
      top: calc(50% - 4.5px);
      left: calc(50% - 4.5px);
      height: 9px;
      width: 9px;
    }
  }
`})),f,p,m=e((()=>{t(),o(),d(),f=a(),p=e=>{let{label:t,disabled:n,required:r,invalid:i}=e,a=s(e,[`label`,`invalid`,`required`]);return(0,f.jsxs)(u,{$disabled:n,$required:r,$invalid:i,children:[(0,f.jsx)(`input`,{...a,type:`radio`}),(0,f.jsx)(`span`,{}),t&&(0,f.jsx)(l,{children:t})]})},p.__docgenInfo={description:``,methods:[],displayName:`RadioButton`,props:{label:{required:!1,tsType:{name:`union`,raw:`Element | Element[]`,elements:[{name:`union`,raw:`JSX.Element | string | number | boolean | null`,elements:[{name:`JSX.Element`},{name:`string`},{name:`number`},{name:`boolean`},{name:`null`}]},{name:`Array`,elements:[{name:`union`,raw:`JSX.Element | string | number | boolean | null`,elements:[{name:`JSX.Element`},{name:`string`},{name:`number`},{name:`boolean`},{name:`null`}]}],raw:`Element[]`}]},description:``},required:{required:!1,tsType:{name:`boolean`},description:``},invalid:{required:!1,tsType:{name:`boolean`},description:``},type:{required:!0,tsType:{name:`literal`,value:`'radio'`},description:``}},composes:[`Omit`]}}));export{m as n,p as t};