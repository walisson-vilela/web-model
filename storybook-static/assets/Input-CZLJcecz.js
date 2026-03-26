import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./react-B_0iYUWB.js";import{a as r,i,o as a}from"./styled-components.browser.esm-BYvzgcDz.js";import{r as o}from"./iframe-fSyR9o4x.js";import{n as s,s as c}from"./validators-Chja94ks.js";import{c as l,t as u}from"./formatters-C0aJpNv6.js";import{n as d,t as f}from"./Loader-CzH8aMET.js";import{n as p,t as m}from"./Icon-7EFkF0Ko.js";import{n as h,t as g}from"./Form-BqpbciIA.js";import{n as _,t as v}from"./functions-CLJyMY6T.js";import{n as y,t as b}from"./EllipsisContainer-CYb-gjAK.js";var x,S,C,w,T,E,D,O=t((()=>{i(),y(),x=a.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 17px;

  background-color: transparent;
  border: none;
  box-shadow: none;
  padding: 0;
`,S=a(b)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  line-height: 1;
  gap: calc(${({theme:e})=>e.spacings.s1} / 2);
`,C=a.input`
  ${({theme:e})=>e.useTypography(`p`)};

  color: ${({theme:e,$invalid:t})=>t?e.colors.warningRed:e.colors.darkBlue};

  &::placeholder {
    color: ${({theme:e,$invalid:t})=>t?e.colors.warningRed:e.colors.darkGrey};

    ${({placeholder:e})=>e===`••••••••`?r`
        opacity: 0.5;
        font-size: 14px;
        letter-spacing: 0px;
      `:r`
          ${({theme:e})=>e.useTypography(`p`)};
          opacity: 1;
        `}
  }

  display: block;
  width: 100%;
  box-sizing: border-box;

  ${({theme:e,$paddingless:t})=>t?r`
        padding: 0;
      `:r`
      padding: ${e.spacings.s2} ${e.spacings.s3};
      ~ ${S} {
        padding: 0 ${e.spacings.s3};
      }
    `};

  border-width: 1px;
  border-style: solid;
  border-color: ${({theme:e,$invalid:t,$borderless:n})=>n?`transparent`:t?e.colors.warningRed:e.colors.lightGrey};
  border-radius: 4px;

  ${({theme:e,$invalid:t})=>{let n=t?e.getColor(`warningRed`,5):e.colors.white;return r`
      background-color: ${n};
      /** google chrome blue background */
      -webkit-box-shadow: 0 0 0px 1000px ${n} inset !important;
    `}};

  box-shadow: none;
  outline: none;

  ${({$arrows:e})=>{if(!e)return r`
      /* Chrome, Safari, Edge, Opera */
      &:-webkit-outer-spin-button,
      &:-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      /* Firefox */
      -moz-appearance: textfield;
    `}}

  ${({readOnly:e,onClick:t,disabled:n})=>{if(!(!e||!t||n))return r`
      cursor: pointer;
    `}}
`,w=a.div`
  position: relative;
  width: ${({$width:e})=>e||`100%`};
`,T=a.label`
  ${({theme:e})=>e.useTypography(`p`)};
  line-height: 17px;

  color: ${({theme:e})=>e.colors.greyishBlue};

  width: ${({$width:e})=>e||`100%`};
  box-sizing: border-box;
  display: block;

  ${({$disabled:e,$viewMode:t})=>{if(!(!e||t))return r`
      opacity: 0.5;
    `}}

  > ${w} > ${x} {
    bottom: ${({theme:e,$paddingless:t})=>t?`2px`:`calc(${e.spacings.s2} + 1px)`};
  }

  ${({$disabled:e})=>{if(e)return r`
      > ${w}:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    `}}

  ${({$readOnly:e,$disabled:t,$loading:n})=>{if(!(n||e||t))return r`
      cursor: pointer;
    `}}

  ${({theme:e,$iconWidths:t,$iconPosition:n,$paddingless:i})=>{if(t.length<1)return;let a=`calc(${t.join(` + `)} + ${e.spacings.s1} / 2 * ${t.length-1})`,o=i?`0px`:e.spacings.s3;return n===`right`?r`
        > ${w} > ${x} {
          width: ${a};
          right: calc(${o} / 2);
        }

        > ${w} > ${C} {
          padding-right: calc(${o} + ${a});
          ~ ${S} {
            padding-right: calc(${o} + ${a});
          }
        }
      `:r`
      > ${w} > ${x} {
        width: ${a};
        left: calc(${o} / 2);
      }

      > ${w} > ${C} {
        padding-left: calc(${o} + ${a});
        ~ ${S} {
          padding-left: calc(${o} + ${a});
        }
      }
    `}}
`,E=a.div`
  display: inline-block;

  ${({$viewMode:e})=>{if(e)return r`
      font-weight: bold;
    `}}

  margin-bottom: ${({theme:e,$viewMode:t})=>e.spacings[t?`s3`:`s1`]};

  ${({$required:e,$viewMode:t})=>{if(!(!e||t))return r`
      &:after {
        content: ' *';
      }
    `}}
`,D=a.div`
  ${({children:e})=>{if(!e)return r`
      &:before {
        content: ' ';
        white-space: pre;
      }
    `}}
`})),k,A,j,M,N=t((()=>{k=e(n(),1),l(),s(),h(),p(),d(),_(),O(),A=o(),j=(e,t,n,r)=>{let i=e.target,a=i.value,o=r(a),[s,c]=i.selectionStart===i.selectionEnd&&i.selectionEnd===i.value.length?[o.length,o.length]:[i.selectionStart,i.selectionEnd];i.value=o,t&&t(e),n(o),[`text`,`search`,`url`,`password`].includes(i.type)&&i.setSelectionRange(s,c)},M=k.forwardRef((e,t)=>{let{label:n,loading:r,readOnly:i,arrows:a,borderless:o,paddingless:s,clearable:l,onPressEnter:d,width:p}={...e},h=e.setValue||(()=>{}),{isRequired:_,isInvalid:y,isViewMode:b,isDisabled:O}=g.useContext(e.name),M=(0,k.useRef)(!1),N=(0,k.useMemo)(()=>v(e.mask),[e.mask]);(0,k.useEffect)(()=>{if(M.current||!c(e.value))return;let t=N(e.value);t!==e.value&&h(t)},[M.current,e.value]);let P=y()||e.invalid,F=_()||e.required,I=O()||e.disabled,L=b()||e.viewMode,R=u(e,[`arrows`,`borderless`,`children`,`clearable`,`dirty`,`htmlDisabled`,`htmlReadOnly`,`icon`,`inputWidth`,`invalid`,`label`,`loading`,`mask`,`onPressEnter`,`paddingless`,`setValue`,`viewMode`,`width`],{$invalid:P,type:`text`,$arrows:a,$borderless:o,$paddingless:s});if(R.onChange=t=>{if(M.current){e.onChange&&e.onChange(t),h(t.target.value);return}j(t,e.onChange,h,N)},R.onKeyDown||d){let e=R.onKeyDown||(()=>{}),t=d?e=>{e.preventDefault(),d(e)}:()=>{};R.onKeyDown=n=>{e(n),n.key===`Enter`&&t(n)}}if(R.onKeyUp){let e=R.onKeyUp;R.onKeyUp=t=>{let n=t.target,r=n.value;e(t),r!==n.value&&h(n.value)}}if(R.onKeyDownCapture){let e=R.onKeyDownCapture;R.onKeyDownCapture=t=>{let n=t.target,r=n.value;e(t),r!==n.value&&h(n.value)}}if(R.onCompositionStart=t=>{M.current=!0,e.onCompositionStart?.(t)},R.onCompositionEnd=t=>{M.current=!1,j(t,e.onCompositionEnd,h,N)},R.onKeyUpCapture){let e=R.onKeyUpCapture;R.onKeyUpCapture=t=>{let n=t.target,r=n.value;e(t),r!==n.value&&h(n.value)}}let z=(()=>{let t={...P?{color:`warningRed`}:{}};if(l){let e=typeof l==`function`?l:()=>h(``);return{...t,type:`feather`,icon:`x`,width:`14px`,onClick:t=>{t.preventDefault(),e()}}}return e.icon?{...t,...e.icon.icon}:e.icon})(),{dirty:B}=e,V=(()=>{if(B===void 0||typeof B==`function`)return B;if(e.value!==B)return()=>h(B)})();return e.htmlDisabled&&(R.disabled=!0),e.htmlReadOnly&&(R.readOnly=!0),(0,A.jsxs)(T,{$readOnly:i||L,$disabled:I,$loading:r,$invalid:P,$paddingless:s,$iconPosition:e.icon?.position||`right`,$iconWidths:r?[`14px`]:[...z?[z.width||`24px`]:[],...V?[`10px`]:[]],$width:p,$viewMode:L,children:[n&&(0,A.jsx)(E,{$required:F,$viewMode:L,children:n}),L?(0,A.jsx)(D,{children:R.value||e.children}):(0,A.jsxs)(w,{$width:e.inputWidth,children:[(0,A.jsx)(C,{...R,ref:t}),e.children&&(0,A.jsx)(S,{children:e.children}),(0,A.jsx)(x,{children:r?(0,A.jsx)(m,{type:`jsx`,icon:(0,A.jsx)(f,{size:`14px`}),width:`14px`}):(0,A.jsxs)(k.Fragment,{children:[V&&(0,A.jsx)(m,{type:`feather`,icon:`rotate_ccw`,width:`10px`,onClick:e.disabled?void 0:e=>{e.preventDefault(),V()},...P?{color:`warningRed`}:{}}),z&&(0,A.jsx)(m,{...z,...`onClick`in z&&e.disabled?{onClick:void 0}:{}})]})})]})]})}),M.displayName=`Input`,M.__docgenInfo={description:``,methods:[],displayName:`Input`,props:{label:{required:!1,tsType:{name:`union`,raw:`Element | Element[]`,elements:[{name:`union`,raw:`JSX.Element | string | number | boolean | null`,elements:[{name:`JSX.Element`},{name:`string`},{name:`number`},{name:`boolean`},{name:`null`}]},{name:`Array`,elements:[{name:`union`,raw:`JSX.Element | string | number | boolean | null`,elements:[{name:`JSX.Element`},{name:`string`},{name:`number`},{name:`boolean`},{name:`null`}]}],raw:`Element[]`}]},description:``},invalid:{required:!1,tsType:{name:`boolean`},description:``},disabled:{required:!1,tsType:{name:`boolean`},description:``},loading:{required:!1,tsType:{name:`boolean`},description:``},mask:{required:!1,tsType:{name:`union`,raw:`MaskFunction | MaskReplace | MaskReplaceArray`,elements:[{name:`signature`,type:`function`,raw:`(value: string) => string`,signature:{arguments:[{type:{name:`string`},name:`value`}],return:{name:`string`}}},{name:`tuple`,raw:`[RegExp, string]`,elements:[{name:`RegExp`},{name:`string`}]},{name:`Array`,elements:[{name:`tuple`,raw:`[RegExp, string]`,elements:[{name:`RegExp`},{name:`string`}]}],raw:`MaskReplace[]`}]},description:``},icon:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  icon: IconProps
  position?: 'left' | 'right'
}`,signature:{properties:[{key:`icon`,value:{name:`union`,raw:`FeatherIcon | SVGIcon | JSXIcon`,elements:[{name:`FeatherIcon`},{name:`SVGIcon`},{name:`JSXIcon`}],required:!0}},{key:`position`,value:{name:`union`,raw:`'left' | 'right'`,elements:[{name:`literal`,value:`'left'`},{name:`literal`,value:`'right'`}],required:!1}}]}},description:``},clearable:{required:!1,tsType:{name:`union`,raw:`boolean | (() => void)`,elements:[{name:`boolean`},{name:`unknown`}]},description:``},setValue:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(value: string) => void`,signature:{arguments:[{type:{name:`string`},name:`value`}],return:{name:`void`}}},description:``},onPressEnter:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(event: React.KeyboardEvent<HTMLInputElement>) => void`,signature:{arguments:[{type:{name:`ReactKeyboardEvent`,raw:`React.KeyboardEvent<HTMLInputElement>`,elements:[{name:`HTMLInputElement`}]},name:`event`}],return:{name:`void`}}},description:``},htmlDisabled:{required:!1,tsType:{name:`boolean`},description:``},htmlReadOnly:{required:!1,tsType:{name:`boolean`},description:``},viewMode:{required:!1,tsType:{name:`boolean`},description:``},type:{required:!1,tsType:{name:`union`,raw:`'text' | 'number' | 'search' | 'email' | 'url' | 'PASSWORD'`,elements:[{name:`literal`,value:`'text'`},{name:`literal`,value:`'number'`},{name:`literal`,value:`'search'`},{name:`literal`,value:`'email'`},{name:`literal`,value:`'url'`},{name:`literal`,value:`'PASSWORD'`}]},description:``},width:{required:!1,tsType:{name:`string`},description:``},arrows:{required:!1,tsType:{name:`boolean`},description:``},borderless:{required:!1,tsType:{name:`boolean`},description:``},paddingless:{required:!1,tsType:{name:`boolean`},description:``},inputWidth:{required:!1,tsType:{name:`string`},description:``},children:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},dirty:{required:!1,tsType:{name:`union`,raw:`(() => void) | string`,elements:[{name:`unknown`},{name:`string`}]},description:``}}}}));export{N as n,M as t};