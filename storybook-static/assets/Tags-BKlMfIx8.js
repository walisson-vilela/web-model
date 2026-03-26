import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./react-B_0iYUWB.js";import{a as r,i,o as a}from"./styled-components.browser.esm-BYvzgcDz.js";import{r as o}from"./iframe-fSyR9o4x.js";import{n as s,u as c}from"./validators-Chja94ks.js";import{c as l,t as u}from"./formatters-C0aJpNv6.js";import{n as d,t as f}from"./Icon-7EFkF0Ko.js";import{n as p,t as m}from"./functions-CLJyMY6T.js";var h,g=t((()=>{i(),h=a.input`
  ${({theme:e})=>e.useTypography(`p`)}

  color: ${({theme:e,$invalid:t})=>t?e.colors.warningRed:e.colors.darkBlue};

  &::placeholder {
    color: ${({theme:e,$invalid:t})=>t?e.colors.warningRed:e.colors.darkGrey};

    ${({theme:e})=>e.useTypography(`p`)}
    opacity: 1;
  }

  display: block;
  box-sizing: border-box;
  flex: 1;
  min-width: ${({$minWidth:e})=>e||`20%`};

  padding: calc(${({theme:e})=>e.spacings.s1} / 2) 0;

  box-shadow: none;
  outline: none;
  border: 1px solid transparent;
`})),_,v,y,b=t((()=>{_=e(n(),1),l(),p(),g(),v=o(),y=_.forwardRef((e,t)=>{let[n,r]=e.value,i=e.onKeyDown||(()=>{}),a=e.onPressEnter,o=e=>{i(e),e.key===`Enter`&&(e.preventDefault(),a(e))},s=m(e.mask),c=e.onChange||(()=>{}),l=e=>{e.target.value=s(e.target.value),c(e),r(e.target.value)},d=u(e,[`mask`,`value`,`onPressEnter`,`invalid`,`minWidth`]);return(0,v.jsx)(h,{ref:t,...d,onChange:l,onKeyDown:o,value:n,$invalid:e.invalid,$minWidth:e.minWidth})}),y.displayName=`Input`,y.__docgenInfo={description:``,methods:[],displayName:`Input`,props:{mask:{required:!1,tsType:{name:`union`,raw:`MaskFunction | MaskReplace | MaskReplaceArray`,elements:[{name:`signature`,type:`function`,raw:`(value: string) => string`,signature:{arguments:[{type:{name:`string`},name:`value`}],return:{name:`string`}}},{name:`tuple`,raw:`[RegExp, string]`,elements:[{name:`RegExp`},{name:`string`}]},{name:`Array`,elements:[{name:`tuple`,raw:`[RegExp, string]`,elements:[{name:`RegExp`},{name:`string`}]}],raw:`MaskReplace[]`}]},description:``},value:{required:!0,tsType:{name:`tuple`,raw:`[string, (value: string) => void]`,elements:[{name:`string`},{name:`signature`,type:`function`,raw:`(value: string) => void`,signature:{arguments:[{type:{name:`string`},name:`value`}],return:{name:`void`}}}]},description:``},onPressEnter:{required:!0,tsType:{name:`ReactKeyboardEventHandler`,raw:`React.KeyboardEventHandler<HTMLInputElement>`,elements:[{name:`HTMLInputElement`}]},description:``},invalid:{required:!1,tsType:{name:`boolean`},description:``},minWidth:{required:!1,tsType:{name:`string`},description:``}},composes:[`Omit`]}})),x,S=t((()=>{i(),x=a.div`
  display: inline-block;
  margin-bottom: ${({theme:e})=>e.spacings.s1};

  ${({$required:e})=>{if(e)return r`
      &:after {
        content: ' *';
      }
    `}}
`})),C,w,T=t((()=>{n(),S(),C=o(),w=({required:e,...t})=>t.children?(0,C.jsx)(x,{...t,$required:e}):null,w.__docgenInfo={description:``,methods:[],displayName:`Label`,props:{required:{required:!1,tsType:{name:`boolean`},description:``}}}})),E,D=t((()=>{i(),E=a.div`
  ${({theme:e})=>e.useTypography(`p`)}

  background-color: ${({theme:e})=>e.colors.white};
  color: ${({theme:e})=>e.colors.darkBlue};
  padding: calc(${({theme:e})=>e.spacings.s1} / 2);

  border-style: solid;
  border-width: 1px;
  border-color: ${({theme:e,$invalid:t})=>e.colors[t?`warningRed`:`lightGrey`]};
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacings.s1};

  > div:last-child {
    cursor: pointer;
  }
`})),O,k,A=t((()=>{n(),d(),D(),O=o(),k=({invalid:e,onClose:t,...n})=>(0,O.jsxs)(E,{...n,$invalid:e,children:[n.children,(0,O.jsx)(`div`,{onClick:t,children:(0,O.jsx)(f,{type:`feather`,icon:`x`,width:`10px`,color:e?`warningRed`:void 0,strokeWidth:`3px`})})]}),k.__docgenInfo={description:``,methods:[],displayName:`Tag`,props:{invalid:{required:!1,tsType:{name:`boolean`},description:``},onClose:{required:!0,tsType:{name:`ReactMouseEventHandler`,raw:`React.MouseEventHandler<HTMLDivElement>`,elements:[{name:`HTMLDivElement`}]},description:``}}}})),j=t((()=>{b(),T(),A()})),M,N,P=t((()=>{i(),M=a.label`
  ${({theme:e})=>e.useTypography(`p`)};

  color: ${({theme:e})=>e.colors.greyishBlue};

  width: ${({$width:e})=>e||`100%`};
  max-width: 100%;
  box-sizing: border-box;
  position: relative;
  display: block;

  ${({$disabled:e})=>{if(e)return r`
      opacity: 0.5;
    `}}
`,N=a.div`
  display: flex;
  flex-wrap: wrap;
  gap: calc(${({theme:e})=>e.spacings.s1} / 2);

  ${({$borderless:e,theme:t,$invalid:n})=>{if(!e)return r`
        border-width: 1px;
        border-style: solid;
        border-radius: 4px;
        border-color: ${t.colors[n?`warningRed`:`lightGrey`]};
      `}};

  ${({theme:e,$paddingless:t})=>t?r`
        padding: 0;
        > input {
          padding: 0;
        }
      `:r`
      padding: ${e.spacings.s1};
    `};
`})),F,I,L,R=t((()=>{F=e(n(),1),s(),j(),P(),I=o(),L=F.forwardRef((e,t)=>{let{value:n,setValue:r}=e,[i,a]=e.input?.value?e.input.value:(0,F.useState)(``),o=e.paddingless||!1,s=e.borderless||!1,l=e.maxTags||1/0,u=e.validate||(()=>!0),d=e.onBlur||(()=>{}),f=e.onBeforeAdd||(e=>e),p=e.unique?e=>n.some(t=>c(t,e))?``:e:e=>e,m=e=>{if(e===``)return;let t=p(e);if(t===``||(t=f(t),t===``))return;let i=[...n,t];i.length>l||(r(i),a(``))},h=e=>{let t=[...n];t.splice(e,1),r([...t])};return(0,I.jsxs)(M,{$disabled:e.disabled,$width:e.width,children:[(0,I.jsx)(w,{required:e.required,children:e.label}),(0,I.jsxs)(N,{$invalid:e.invalid,$borderless:s,$paddingless:o,children:[n.map((e,t)=>(0,I.jsx)(k,{onClose:()=>h(t),invalid:!u(e),children:e},t)),(0,I.jsx)(y,{onBlur:d,ref:t,disabled:e.disabled||e.loading||n.length===l,invalid:e.invalid,placeholder:n.length===0?e.placeholder:``,...e.input,value:[i,a],onPressEnter:e=>m(e.target.value),style:n.length===l?{width:0,minWidth:0,maxWidth:0,border:`none`}:{}})]})]})}),L.displayName=`Tags`,L.__docgenInfo={description:``,methods:[],displayName:`Tags`,props:{type:{required:!0,tsType:{name:`literal`,value:`'tags'`},description:``},label:{required:!1,tsType:{name:`union`,raw:`Element | Element[]`,elements:[{name:`union`,raw:`JSX.Element | string | number | boolean | null`,elements:[{name:`JSX.Element`},{name:`string`},{name:`number`},{name:`boolean`},{name:`null`}]},{name:`Array`,elements:[{name:`union`,raw:`JSX.Element | string | number | boolean | null`,elements:[{name:`JSX.Element`},{name:`string`},{name:`number`},{name:`boolean`},{name:`null`}]}],raw:`Element[]`}]},description:``},width:{required:!1,tsType:{name:`string`},description:``},disabled:{required:!1,tsType:{name:`boolean`},description:``},loading:{required:!1,tsType:{name:`boolean`},description:``},invalid:{required:!1,tsType:{name:`boolean`},description:``},required:{required:!1,tsType:{name:`boolean`},description:``},input:{required:!1,tsType:{name:`Omit`,elements:[{name:`InputProps`},{name:`union`,raw:`'onPressEnter' | 'invalid'`,elements:[{name:`literal`,value:`'onPressEnter'`},{name:`literal`,value:`'invalid'`}]}],raw:`Omit<InputProps, 'onPressEnter' | 'invalid'>`},description:``},value:{required:!0,tsType:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},description:``},setValue:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(value: string[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},name:`value`}],return:{name:`void`}}},description:``},validate:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(value: string) => boolean`,signature:{arguments:[{type:{name:`string`},name:`value`}],return:{name:`boolean`}}},description:``},onBeforeAdd:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(value: string) => string`,signature:{arguments:[{type:{name:`string`},name:`value`}],return:{name:`string`}}},description:``},unique:{required:!1,tsType:{name:`boolean`},description:``},maxTags:{required:!1,tsType:{name:`number`},description:``},borderless:{required:!1,tsType:{name:`boolean`},description:``},paddingless:{required:!1,tsType:{name:`boolean`},description:``},placeholder:{required:!1,tsType:{name:`string`},description:``},onBlur:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}}));export{R as n,L as t};