import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./react-B_0iYUWB.js";import{a as r,i,o as a}from"./styled-components.browser.esm-BYvzgcDz.js";import{r as o}from"./iframe-fSyR9o4x.js";import{m as s,n as c}from"./validators-Chja94ks.js";import{c as l,t as u}from"./formatters-C0aJpNv6.js";import{n as d,t as f}from"./Form-BqpbciIA.js";var p,m,h=t((()=>{i(),p=a.div`
  ${({theme:e})=>e.useTypography(`p`,{lineHeight:e.spacings.s3})}
  display: flex;
  align-items: center;

  ${({$breakLabel:e})=>e&&r`
      width: 100%;
    `}

  ${({$required:e,$viewMode:t})=>{if(!(!e||t))return r`
      &:after {
        content: '*';
      }
    `}}

  ${({$keepSpace:e,children:t})=>{if(!(!e||t))return r`
      &:before {
        content: '';
        white-space: pre;
      }
    `}}
`,m=a.label`
  display: flex;
  gap: ${({theme:e})=>e.spacings.s1};
  position: relative;
  align-items: center;
  flex-wrap: wrap;

  ${({$disabled:e})=>e?r`
      opacity: 0.5;
    `:r`
        > span {
          cursor: pointer;
        }
      `}

  ${({$invalid:e})=>e?r`
      > span:before {
        border-color: ${({theme:e})=>e.colors.warningRed};
      }
      > input:checked + span {
        background-color: ${({theme:e})=>e.colors.warningRed};
      }
    `:r`
        > span:before {
          border-color: ${({theme:e})=>e.colors.lightGrey};
        }
        > input:checked + span {
          background-color: ${({theme:e})=>e.colors.blue};
        }
      `}

  > input {
    position: absolute;
    height: 0%;
    width: 0%;
    opacity: 0;
  }

  > span {
    position: relative;
    width: 50px;
    height: calc(${({theme:e})=>e.spacings.s4} + 1px);
    background-color: ${({theme:e})=>e.colors.warningGray};
    border-radius: 20px;
    transition-property: background-color;
    transition-duration: 0.4s;
    transition-timing-function: ease-in-out;
    box-sizing: content-box;
    &:before {
      content: '';
      transition-property: left;
      transition-duration: 0.4s;
      transition-timing-function: ease-in-out;
      position: absolute;
      border-width: 1px;
      border-style: solid;
      border-radius: 100%;
      left: 0;
      box-shadow: 0px 1px 3px ${({theme:e})=>e.getColor(`black`,10)};
      width: calc(${({theme:e})=>e.spacings.s4} - 1px);
      height: calc(${({theme:e})=>e.spacings.s4} - 1px);
      background-color: ${({theme:e})=>e.colors.white};
    }
  }

  > input:checked + span {
    &:before {
      left: calc(100% - ${({theme:e})=>e.spacings.s4} - 1px);
    }
  }
`})),g,_,v,y=t((()=>{g=e(n(),1),l(),c(),d(),h(),_=o(),v=e=>{let{isRequired:t,isInvalid:n,isViewMode:r,isDisabled:i}=f.useContext(e.name),a=n()||e.invalid,o=t()||e.required,c=i()||e.disabled,l=r()||e.viewMode,d=s(e.label)?e.label:{label:e.label},h=u(e,[`label`,`invalid`,`required`,`htmlDisabled`,`labelProps`,`viewMode`,`breakLabel`]);return h.disabled=e.disabled||e.htmlDisabled,(0,_.jsxs)(m,{...e.labelProps||{},$disabled:c,$invalid:a,children:[d.label&&(0,_.jsx)(p,{$required:o,$viewMode:l,$breakLabel:e.breakLabel,children:d.label}),l?(0,_.jsx)(p,{$keepSpace:!0,children:d[e.checked?`after`:`before`]}):(0,_.jsxs)(g.Fragment,{children:[d.before&&(0,_.jsx)(p,{children:d.before}),(0,_.jsx)(`input`,{...h,type:`checkbox`}),(0,_.jsx)(`span`,{}),d.after&&(0,_.jsx)(p,{children:d.after})]})]})},v.__docgenInfo={description:``,methods:[],displayName:`Switch`,props:{label:{required:!1,tsType:{name:`union`,raw:`| ReactNode
| {
    label?: ReactNode
    before?: ReactNode
    after?: ReactNode
  }`,elements:[{name:`union`,raw:`Element | Element[]`,elements:[{name:`union`,raw:`JSX.Element | string | number | boolean | null`,elements:[{name:`JSX.Element`},{name:`string`},{name:`number`},{name:`boolean`},{name:`null`}]},{name:`Array`,elements:[{name:`union`,raw:`JSX.Element | string | number | boolean | null`,elements:[{name:`JSX.Element`},{name:`string`},{name:`number`},{name:`boolean`},{name:`null`}]}],raw:`Element[]`}],required:!1},{name:`signature`,type:`object`,raw:`{
  label?: ReactNode
  before?: ReactNode
  after?: ReactNode
}`,signature:{properties:[{key:`label`,value:{name:`union`,raw:`Element | Element[]`,elements:[{name:`union`,raw:`JSX.Element | string | number | boolean | null`,elements:[{name:`JSX.Element`},{name:`string`},{name:`number`},{name:`boolean`},{name:`null`}]},{name:`Array`,elements:[{name:`union`,raw:`JSX.Element | string | number | boolean | null`,elements:[{name:`JSX.Element`},{name:`string`},{name:`number`},{name:`boolean`},{name:`null`}]}],raw:`Element[]`}],required:!1}},{key:`before`,value:{name:`union`,raw:`Element | Element[]`,elements:[{name:`union`,raw:`JSX.Element | string | number | boolean | null`,elements:[{name:`JSX.Element`},{name:`string`},{name:`number`},{name:`boolean`},{name:`null`}]},{name:`Array`,elements:[{name:`union`,raw:`JSX.Element | string | number | boolean | null`,elements:[{name:`JSX.Element`},{name:`string`},{name:`number`},{name:`boolean`},{name:`null`}]}],raw:`Element[]`}],required:!1}},{key:`after`,value:{name:`union`,raw:`Element | Element[]`,elements:[{name:`union`,raw:`JSX.Element | string | number | boolean | null`,elements:[{name:`JSX.Element`},{name:`string`},{name:`number`},{name:`boolean`},{name:`null`}]},{name:`Array`,elements:[{name:`union`,raw:`JSX.Element | string | number | boolean | null`,elements:[{name:`JSX.Element`},{name:`string`},{name:`number`},{name:`boolean`},{name:`null`}]}],raw:`Element[]`}],required:!1}}]}}]},description:``},labelProps:{required:!1,tsType:{name:`ReactLabelHTMLAttributes`,raw:`React.LabelHTMLAttributes<HTMLLabelElement>`,elements:[{name:`HTMLLabelElement`}]},description:``},required:{required:!1,tsType:{name:`boolean`},description:``},invalid:{required:!1,tsType:{name:`boolean`},description:``},htmlDisabled:{required:!1,tsType:{name:`boolean`},description:``},viewMode:{required:!1,tsType:{name:`boolean`},description:``},breakLabel:{required:!1,tsType:{name:`boolean`},description:``},type:{required:!0,tsType:{name:`literal`,value:`'switch'`},description:``}},composes:[`Omit`]}}));export{y as n,v as t};