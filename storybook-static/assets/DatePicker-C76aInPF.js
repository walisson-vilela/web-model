import{a as e,n as t}from"./chunk-BneVvdWh.js";import{t as n}from"./react-B_0iYUWB.js";import{a as r,i,o as a}from"./styled-components.browser.esm-BYvzgcDz.js";import{r as o}from"./iframe-fSyR9o4x.js";import{d as s}from"./validators-Chja94ks.js";import{c,l,t as u}from"./formatters-C0aJpNv6.js";import{a as d,n as f,o as p,t as m}from"./Calendar-X3vNC0iC.js";import{n as h,t as g}from"./hooks-MVq9czon.js";import{n as _,t as v}from"./Icon-7EFkF0Ko.js";import{n as y,t as b}from"./Input-CZLJcecz.js";var x,S,C,w,T=t((()=>{i(),x=a.div`
  position: relative;

  input {
    color: transparent;
  }
`,S=a.div`
  ${({theme:e})=>e.useTypography(`p`,{lineHeight:e.spacings.s3})}
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100%;
  line-height: 1;
`,C=a.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border-radius: 4px;
  font-size: 14px;

  ${({theme:e,$iconWidth:t,$paddingless:n})=>n?r`
        bottom: ${1}px;
        left: ${1}px;
        width: calc(100% - ${2}px - ${t});
        height: calc(17px + ${2}px);
      `:r`
      bottom: ${1}px;
      left: ${1}px;
      width: calc(
        100% - ${2}px - ${t} - ${e.spacings.s3}
      );
      height: calc(31px + ${2}px);
      padding: 0 0 0 ${e.spacings.s3};
    `}

  ${({$invalid:e,theme:t})=>{if(e)return r`
      color: ${t.colors.warningRed};
    `}}

  ${({$disabled:e})=>{if(e)return r`
      opacity: 0.5;
    `}}
`,w=a.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  padding: 0;
  box-shadow: none;
  line-height: 0;

  svg {
    display: block;
  }

  ${({onClick:e})=>{if(e)return r`
      &:not(:disabled) {
        cursor: pointer;
      }
    `}};
`})),E,D,O,k=t((()=>{E=e(n(),1),c(),g(),f(),p(),_(),y(),T(),D=o(),O=E.forwardRef((e,t)=>{let{picker:n,value:r,setValue:i,min:a,max:o}=e,c=e.disabled||e.loading,f=s(new Date),[p,g]=(0,E.useState)(!1);(0,E.useEffect)(()=>{l(r)||i(s(d(a,o)))},[r]);let _=()=>{let e=l(r)||new Date;e.setDate(e.getDate()+1),!(o&&e>o)&&i(s(e))},y=()=>{let e=l(r)||new Date;e.setDate(e.getDate()-1),!(a&&e<a)&&i(s(e))},T=n?{icon:{type:`feather`,icon:`calendar`,width:`16px`,height:`16px`,onClick:()=>g(e=>!e)},position:`right`}:void 0,O=u(e,[`picker`,`min`,`max`]);return(0,D.jsxs)(x,{ref:h(()=>g(!1)),children:[(0,D.jsx)(b,{...O,type:`text`,icon:T,ref:t,htmlDisabled:!0}),(0,D.jsxs)(C,{$iconWidth:n?`24px`:`0px`,$invalid:e.invalid,$disabled:e.disabled,$paddingless:e.paddingless,children:[(0,D.jsx)(w,{type:`button`,onClick:c?void 0:y,tabIndex:-1,disabled:c||(()=>{if(!a)return;let e=l(r);if(e)return e<=a})(),children:(0,D.jsx)(v,{type:`feather`,icon:`chevron_left`,color:e.invalid?`warningRed`:`grey`,strokeWidth:`3px`})}),(0,D.jsx)(S,{children:f===r?`Hoje`:r}),(0,D.jsx)(w,{type:`button`,onClick:c?void 0:_,tabIndex:-1,disabled:c||(()=>{if(!o)return;let e=l(r);if(e)return e>=o})(),children:(0,D.jsx)(v,{type:`feather`,icon:`chevron_right`,color:e.invalid?`warningRed`:`grey`,strokeWidth:`3px`})})]}),(0,D.jsx)(m,{...typeof n==`object`?n:{},type:`single`,absolute:!0,open:p,initialValue:r?l(r):void 0,onSubmit:{onClick:e=>{e&&(i(s(e)),g(!1))}},min:a,max:o,references:{bottom:`35px`}})]})}),O.displayName=`DatePicker`,O.__docgenInfo={description:``,methods:[],displayName:`DatePicker`,props:{type:{required:!0,tsType:{name:`literal`,value:`'datepicker'`},description:``},picker:{required:!1,tsType:{name:`union`,raw:`| true
| Omit<
    AbsoluteSingleCalendarProps,
    'initialValue' | 'onSubmit' | 'invalid' | 'open'
  >`,elements:[{name:`literal`,value:`true`},{name:`Omit`,elements:[{name:`intersection`,raw:`Common &
Omit<AbsoluteContainerProps, 'onSubmit'>`,elements:[{name:`Common`},{name:`Omit`,elements:[{name:`intersection`,raw:`CommonProps & {
  open: boolean
  position?: Position
  axis?: 'x' | 'y'
  center?: {
    x: number
    y: number
  }
  ref?: React.Ref<HTMLDivElement>
  /**
   * defines an element to be the bound reference when calculating auto position,
   * the window will be used by default
   * */
  boundRef?: HTMLDivElement | null
  transition?: Partial<Omit<TransitionArguments, 'active'>>
}`,elements:[{name:`intersection`,raw:`Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children' | 'content'
> & {
  width?: string | number
  height?: string | number
  maxWidth?: string | number
  maxHeight?: string | number
  references?: References
  zIndex?: number
  pointer?:
    | {
        color?: ColorOptions | string | ((theme: ThemeInterface) => string)
        size?: SpacingOptions | string | ((theme: ThemeInterface) => string)
        distance?: SpacingOptions | string | ((theme: ThemeInterface) => string)
      }
    | true
  bgColor?: ColorOptions | string | ((theme: ThemeInterface) => string)
} & (React.PropsWithChildren | { content: React.FunctionComponent })`,elements:[{name:`Omit`,elements:[{name:`ReactHTMLAttributes`,raw:`React.HTMLAttributes<HTMLDivElement>`,elements:[{name:`HTMLDivElement`}]},{name:`union`,raw:`'children' | 'content'`,elements:[{name:`literal`,value:`'children'`},{name:`literal`,value:`'content'`}]}],raw:`Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children' | 'content'
>`},{name:`signature`,type:`object`,raw:`{
  width?: string | number
  height?: string | number
  maxWidth?: string | number
  maxHeight?: string | number
  references?: References
  zIndex?: number
  pointer?:
    | {
        color?: ColorOptions | string | ((theme: ThemeInterface) => string)
        size?: SpacingOptions | string | ((theme: ThemeInterface) => string)
        distance?: SpacingOptions | string | ((theme: ThemeInterface) => string)
      }
    | true
  bgColor?: ColorOptions | string | ((theme: ThemeInterface) => string)
}`,signature:{properties:[{key:`width`,value:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}],required:!1}},{key:`height`,value:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}],required:!1}},{key:`maxWidth`,value:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}],required:!1}},{key:`maxHeight`,value:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}],required:!1}},{key:`references`,value:{name:`References`,required:!1}},{key:`zIndex`,value:{name:`number`,required:!1}},{key:`pointer`,value:{name:`union`,raw:`| {
    color?: ColorOptions | string | ((theme: ThemeInterface) => string)
    size?: SpacingOptions | string | ((theme: ThemeInterface) => string)
    distance?: SpacingOptions | string | ((theme: ThemeInterface) => string)
  }
| true`,elements:[{name:`signature`,type:`object`,raw:`{
  color?: ColorOptions | string | ((theme: ThemeInterface) => string)
  size?: SpacingOptions | string | ((theme: ThemeInterface) => string)
  distance?: SpacingOptions | string | ((theme: ThemeInterface) => string)
}`,signature:{properties:[{key:`color`,value:{name:`union`,raw:`ColorOptions | string | ((theme: ThemeInterface) => string)`,elements:[{name:`union`,raw:`keyof typeof colors`,elements:[{name:`literal`,value:`black`},{name:`literal`,value:`blue`},{name:`literal`,value:`bronze`},{name:`literal`,value:`brown`},{name:`literal`,value:`darkBlue`},{name:`literal`,value:`darkestBlue`},{name:`literal`,value:`darkestGreen`},{name:`literal`,value:`darkestGrey`},{name:`literal`,value:`darkGreen`},{name:`literal`,value:`darkGrey`},{name:`literal`,value:`darkSilver`},{name:`literal`,value:`floralWhite`},{name:`literal`,value:`ghostWhite`},{name:`literal`,value:`green`},{name:`literal`,value:`grey`},{name:`literal`,value:`greyishBlue`},{name:`literal`,value:`iceWhite`},{name:`literal`,value:`lightBlue`},{name:`literal`,value:`lightestGrey`},{name:`literal`,value:`lightGreen`},{name:`literal`,value:`lightGrey`},{name:`literal`,value:`milkWhite`},{name:`literal`,value:`orange`},{name:`literal`,value:`pink`},{name:`literal`,value:`purple`},{name:`literal`,value:`red`},{name:`literal`,value:`silver`},{name:`literal`,value:`snowWhite`},{name:`literal`,value:`vanilla`},{name:`literal`,value:`warningGray`},{name:`literal`,value:`warningRed`},{name:`literal`,value:`warningYellow`},{name:`literal`,value:`white`},{name:`literal`,value:`yellow`}]},{name:`string`},{name:`unknown`}],required:!1}},{key:`size`,value:{name:`union`,raw:`SpacingOptions | string | ((theme: ThemeInterface) => string)`,elements:[{name:`union`,raw:`keyof typeof spacings`,elements:[{name:`literal`,value:`s1`},{name:`literal`,value:`s2`},{name:`literal`,value:`s3`},{name:`literal`,value:`s4`},{name:`literal`,value:`s5`},{name:`literal`,value:`s6`}]},{name:`string`},{name:`unknown`}],required:!1}},{key:`distance`,value:{name:`union`,raw:`SpacingOptions | string | ((theme: ThemeInterface) => string)`,elements:[{name:`union`,raw:`keyof typeof spacings`,elements:[{name:`literal`,value:`s1`},{name:`literal`,value:`s2`},{name:`literal`,value:`s3`},{name:`literal`,value:`s4`},{name:`literal`,value:`s5`},{name:`literal`,value:`s6`}]},{name:`string`},{name:`unknown`}],required:!1}}]}},{name:`literal`,value:`true`}],required:!1}},{key:`bgColor`,value:{name:`union`,raw:`ColorOptions | string | ((theme: ThemeInterface) => string)`,elements:[{name:`union`,raw:`keyof typeof colors`,elements:[{name:`literal`,value:`black`},{name:`literal`,value:`blue`},{name:`literal`,value:`bronze`},{name:`literal`,value:`brown`},{name:`literal`,value:`darkBlue`},{name:`literal`,value:`darkestBlue`},{name:`literal`,value:`darkestGreen`},{name:`literal`,value:`darkestGrey`},{name:`literal`,value:`darkGreen`},{name:`literal`,value:`darkGrey`},{name:`literal`,value:`darkSilver`},{name:`literal`,value:`floralWhite`},{name:`literal`,value:`ghostWhite`},{name:`literal`,value:`green`},{name:`literal`,value:`grey`},{name:`literal`,value:`greyishBlue`},{name:`literal`,value:`iceWhite`},{name:`literal`,value:`lightBlue`},{name:`literal`,value:`lightestGrey`},{name:`literal`,value:`lightGreen`},{name:`literal`,value:`lightGrey`},{name:`literal`,value:`milkWhite`},{name:`literal`,value:`orange`},{name:`literal`,value:`pink`},{name:`literal`,value:`purple`},{name:`literal`,value:`red`},{name:`literal`,value:`silver`},{name:`literal`,value:`snowWhite`},{name:`literal`,value:`vanilla`},{name:`literal`,value:`warningGray`},{name:`literal`,value:`warningRed`},{name:`literal`,value:`warningYellow`},{name:`literal`,value:`white`},{name:`literal`,value:`yellow`}]},{name:`string`},{name:`unknown`}],required:!1}}]}},{name:`unknown`}]},{name:`signature`,type:`object`,raw:`{
  open: boolean
  position?: Position
  axis?: 'x' | 'y'
  center?: {
    x: number
    y: number
  }
  ref?: React.Ref<HTMLDivElement>
  /**
   * defines an element to be the bound reference when calculating auto position,
   * the window will be used by default
   * */
  boundRef?: HTMLDivElement | null
  transition?: Partial<Omit<TransitionArguments, 'active'>>
}`,signature:{properties:[{key:`open`,value:{name:`boolean`,required:!0}},{key:`position`,value:{name:`union`,raw:`| 'top right'
| 'top left'
| 'bottom right'
| 'bottom left'
| 'right top'
| 'right bottom'
| 'left top'
| 'left bottom'`,elements:[{name:`literal`,value:`'top right'`},{name:`literal`,value:`'top left'`},{name:`literal`,value:`'bottom right'`},{name:`literal`,value:`'bottom left'`},{name:`literal`,value:`'right top'`},{name:`literal`,value:`'right bottom'`},{name:`literal`,value:`'left top'`},{name:`literal`,value:`'left bottom'`}],required:!1}},{key:`axis`,value:{name:`union`,raw:`'x' | 'y'`,elements:[{name:`literal`,value:`'x'`},{name:`literal`,value:`'y'`}],required:!1}},{key:`center`,value:{name:`signature`,type:`object`,raw:`{
  x: number
  y: number
}`,signature:{properties:[{key:`x`,value:{name:`number`,required:!0}},{key:`y`,value:{name:`number`,required:!0}}]},required:!1}},{key:`ref`,value:{name:`ReactRef`,raw:`React.Ref<HTMLDivElement>`,elements:[{name:`HTMLDivElement`}],required:!1}},{key:`boundRef`,value:{name:`union`,raw:`HTMLDivElement | null`,elements:[{name:`HTMLDivElement`},{name:`null`}],required:!1},description:`defines an element to be the bound reference when calculating auto position,
the window will be used by default`},{key:`transition`,value:{name:`Partial`,elements:[{name:`Omit`,elements:[{name:`Transition`,elements:[{name:`union`,raw:`'width' | 'max-width' | 'height' | 'max-height'`,elements:[{name:`literal`,value:`'width'`},{name:`literal`,value:`'max-width'`},{name:`literal`,value:`'height'`},{name:`literal`,value:`'max-height'`}]}],raw:`Transition<
  'width' | 'max-width' | 'height' | 'max-height'
>`},{name:`literal`,value:`'active'`}],raw:`Omit<TransitionArguments, 'active'>`}],raw:`Partial<Omit<TransitionArguments, 'active'>>`,required:!1}}]}}]},{name:`literal`,value:`'onSubmit'`}],raw:`Omit<AbsoluteContainerProps, 'onSubmit'>`}]},{name:`union`,raw:`'initialValue' | 'onSubmit' | 'invalid' | 'open'`,elements:[{name:`literal`,value:`'initialValue'`},{name:`literal`,value:`'onSubmit'`},{name:`literal`,value:`'invalid'`},{name:`literal`,value:`'open'`}]}],raw:`Omit<
  AbsoluteSingleCalendarProps,
  'initialValue' | 'onSubmit' | 'invalid' | 'open'
>`}]},description:``},value:{required:!0,tsType:{name:`string`},description:``},setValue:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(value: string) => void`,signature:{arguments:[{type:{name:`string`},name:`value`}],return:{name:`void`}}},description:``},max:{required:!1,tsType:{name:`Date`},description:``},min:{required:!1,tsType:{name:`Date`},description:``}},composes:[`Omit`]}}));export{k as n,O as t};